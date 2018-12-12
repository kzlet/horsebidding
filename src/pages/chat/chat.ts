import { Component, ViewChild } from '@angular/core';
import {  NavController, NavParams, Content, ActionSheetController, ToastController, Platform, ModalController  } from 'ionic-angular';
import * as firebase from 'Firebase';
import { ChatGroupsPage } from '../chat-groups/chat-groups';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { AudioPage } from '../audio/audio';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  data = { type: '', nickname: '', message: '' };
  chats = [];
  roomkey: string;
  nickname: string;
  offStatus: boolean = false;
  roomname: string;
  imageURI: any;

  //for Audio recording
  audio: MediaObject;
  audioList: any[] = [];
  recording: boolean = false;
  filePath: string;
  fileName: string;

  //for picture uploading
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;

  constructor(public modalCtrl: ModalController, private file: File, public platform: Platform, private media: Media, public toastCtrl: ToastController, private camera: Camera, public actionSheetCtrl: ActionSheetController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private fileTransfer: FileTransferObject, private fileChooser: FileChooser, private transfer: FileTransfer) {
    this.myPhotosRef = firebase.storage().ref('/images/');
    var mike_value = '0';
    console.log("Mike value" + mike_value);
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.roomname = this.navParams.get("roomname") as string;
    this.data.type = 'message';
    this.data.nickname = this.nickname;

    let joinData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    joinData.set({
      type: 'join',
      user: this.nickname,
      message: this.nickname + ' has joined this room.',
      sendDate: Date()
    });
    this.data.message = '';

    firebase.database().ref('chatrooms/' + this.roomkey + '/chats').on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      setTimeout(() => {
        if (this.offStatus === false) {
          this.content.scrollToBottom(300);
        }
      }, 1000);
    });
  }

  sendMessage() {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      message: this.data.message,
      sendDate: Date(),
      message_status : '1'
    });
    this.data.message = '';
  }

  play(voice : string)
  {
    var voice = 'https://purpledimes.com/mobile_app/lst/images/sample.mp3';
    const file: MediaObject = this.media.create(voice);
    file.play();
  }

  pause(voice :string)
  {
    var voice = 'https://purpledimes.com/mobile_app/lst/images/sample.mp3';
    const file: MediaObject = this.media.create(voice);
    file.pause();
  }

  uploadAudiotoFirebase()
  {
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      voice:"Voice data",
      sendDate: Date(),
      message_status : '0'
    });
    this.data.message = '';
  }

  sendVoicenote()
  { 
    console.log("Start recording");
    var mike_value = 1; 
    if (this.platform.is('ios')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName = 'record'+new Date().getDate()+new Date().getMonth()+new Date().getFullYear()+new Date().getHours()+new Date().getMinutes()+new Date().getSeconds()+'.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    console.log("Stop recording");
    var mike_value = 0;
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem("audiolist", JSON.stringify(this.audioList));
    this.recording = false;
  }

  // OPENmODAL()
  // {
  //   const modal = this.modalCtrl.create(AudioPage);
  //   modal.present();
  // }

  what()
  {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your action',
      buttons: [
        {
          text: 'Add files',
          handler: () => {
            console.log('Destructive clicked');
            this.attachfiles();
          }
        },{
          text: 'Add Image',
          handler: () => {
            console.log('Add images');
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  exitChat() {
    let exitData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    exitData.set({
      type: 'exit',
      user: this.nickname,
      message: this.nickname + ' has exited this room.',
      sendDate: Date()
    });

    this.offStatus = true;

    this.navCtrl.setRoot(ChatGroupsPage, {
      nickname: this.nickname
    });
  }

  attachfiles()
  {
       this.fileChooser.open()
         .then(uri => {
           console.log(uri)
           this.nativeStorage.setItem('uri', uri)
           .then(
             () => console.log('uri Stored!'),
             error => console.error('Error storing item', error)
           );
            
         })
         .catch(e => 
          {
            console.log(e);
            this.presentToast('Error while opening files.');
          });
     
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
     console.log("ImageURL from Source",imagePath)
      this.imageURI = imagePath;
      console.log("ImageURL ",this.imageURI);
      this.uploadImage(this.imageURI);
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
    }
    
    private presentToast(text) {
      let toast = this.toastCtrl.create({
        message: text,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      }

      //let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
      // private uploadPhoto(): void {
      //   this.myPhotosRef.child('myPhoto.png')
      //     .putString(this.imageURI, 'base64', { contentType: 'image/png' })
      //     .then((savedPicture) => {
      //       console.log("After upload"+ savedPicture);
      //       this.myPhotoURL = savedPicture.downloadURL;
      //     });
      // }

      //new example
      uploadImage(imageURI){
        return new Promise<any>((resolve, reject) => {
          let storageRef = firebase.storage().ref();
          let imageRef = storageRef.child('images').child('imageName');
          this.encodeImageUri(imageURI, function(image64){
            imageRef.putString(image64, 'data_url')
            .then(snapshot => {
              resolve(snapshot.downloadURL)
            }, err => {
              reject(err);
            })
          })
        })
      }

      encodeImageUri(imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
          var aux:any = this;
          c.width = aux.width;
          c.height = aux.height;
          ctx.drawImage(img, 0, 0);
          var dataURL = c.toDataURL("image/jpeg");
          callback(dataURL);
        };
        img.src = imageUri;
      };

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
