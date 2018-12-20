import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, ActionSheetController, ToastController, Platform, ModalController } from 'ionic-angular';
import * as firebase from 'Firebase';
import { ChatGroupsPage } from '../chat-groups/chat-groups';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { AudioPage } from '../audio/audio';
import { AngularFireDatabase } from '@angular/fire/database';
import { ChatsettingsPage } from '../chatsettings/chatsettings';

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
  image_url: any;
  audio_url: any;
  mike_value : any = '0';
  uuid: string;

  constructor(private db : AngularFireDatabase,public modalCtrl: ModalController, private file: File, public platform: Platform, private media: Media, public toastCtrl: ToastController, private camera: Camera, public actionSheetCtrl: ActionSheetController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private fileTransfer: FileTransferObject, private fileChooser: FileChooser, private transfer: FileTransfer) {
    this.myPhotosRef = firebase.storage().ref('/images/');
    console.log("Mike value" + this.mike_value);
    this.roomkey = this.navParams.get("key") as string;
    this.nickname = this.navParams.get("nickname") as string;
    this.roomname = this.navParams.get("roomname") as string;
   
    this.nativeStorage.getItem('uuid')
    .then(
      data => {
        this.uuid = data;
      },
      error => console.error(error)
    );
    
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
      message_status: '1',
      uuid : this.uuid,
    });
    this.data.message = '';
  }

  // play(voice: string) {
  //   var voice = 'https://purpledimes.com/mobile_app/lst/images/sample.mp3';
  //   const file: MediaObject = this.media.create(voice);
  //   file.play();
  // }

  // pause(voice: string) {
  //   var voice = 'https://purpledimes.com/mobile_app/lst/images/sample.mp3';
  //   const file: MediaObject = this.media.create(voice);
  //   file.pause();
  // }

  // sendVoicenote() {
  //   console.log("Start recording");
  //   this.mike_value = '1';
  //   if (this.platform.is('ios')) {
  //     this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
  //     this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
  //     this.audio = this.media.create(this.filePath);
  //   } else if (this.platform.is('android')) {
  //     this.fileName = 'record' + new Date().getDate() + new Date().getMonth() + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.3gp';
  //     this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
  //     this.audio = this.media.create(this.filePath);
  //   }
  //   this.audio.startRecord();
  //   this.recording = true;
  //   let toast = this.toastCtrl.create({
  //     message: 'Recording Started !',
  //     duration: 2000,
  //     position: 'top'
  //   });

  //   toast.present(toast);
  // }


  // stopRecord() {
  //   this.mike_value = '0';
  //   console.log("Stop recording");
  //   this.audio.stopRecord();
  //   let data = { filename: this.fileName };
  //   this.audioList.push(data);
  //   localStorage.setItem("audiolist", JSON.stringify(this.audioList));
  //   this.recording = false;
  //   console.log(this.fileName);

  //   //upload audio to firebase
  //   try {

  //     const metadata = {
  //       contentType: 'audio/mp3',
  //     };

  //   let newName = `${new Date().getTime()}.mp3`;
  //   const audio = firebase.storage().ref(`audio/${newName}`);
  //   audio.putString(this.fileName, 'base64', metadata).then(snapshot => {
  //   // console.log(pictures.getDownloadURL);
  //   audio.getDownloadURL().then(url=>{
  //     console.log("Audio URL: " + url);
  //     this.audio_url = url;
  //     this.uploadAudiotoFirebase();
  //   });
  //   }).catch(error => {
  //     console.log("Error data"+ JSON.stringify(error));
  //     let toast = this.toastCtrl.create({
  //       message: 'Recording Stoped due to an Error!',
  //       duration: 2000,
  //       position: 'top'
  //     });
  //     toast.present(toast);  
  //   });

  //   let toast = this.toastCtrl.create({
  //     message: 'Recording Stoped !',
  //     duration: 2000,
  //     position: 'top'
  //   });
  //   toast.present(toast);
  // }
  // catch(error){
  //   console.log("Catch error:" + JSON.stringify(error));
  // }
  // }

  // uploadAudiotoFirebase() {
  //   console.log("Get audio data started" + this.audio_url);
  //   let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
  //   newData.set({
  //     type: this.data.type,
  //     user: this.data.nickname,
  //     voice: this.audio_url,
  //     sendDate: Date()
  //   });
  //   this.data.message = '';
  // }

  what() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose your action',
      buttons: [
        {
          text: 'Add files',
          handler: () => {
            console.log('Destructive clicked');
            this.attachfiles();
          }
        }, {
          text: 'Add Image',
          handler: () => {
            console.log('Add images');
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
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

  attachfiles() {
    this.fileChooser.open()
      .then(uri => {
        console.log(uri);
      })
      .catch(e => {
        console.log(e);
        this.presentToast('Error while opening files.');
      });

  }

  async takePicture(sourceType) {
    console.log("Storage function called");
    try {
      const options: CameraOptions = {
        quality: 50,
        sourceType: sourceType,
        correctOrientation: true,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
      const result = await this.camera.getPicture(options);
      var metadata = {
        contentType: 'image/jpeg',
      };
      let newName = `${new Date().getTime()}.txt`;
      const pictures = firebase.storage().ref(`images/${newName}`);
      pictures.putString(result, 'base64', metadata).then(snapshot => {
      // console.log(pictures.getDownloadURL);
      pictures.getDownloadURL().then(url=>{
        console.log("log1: " + url);
        this.image_url = url;
        this.uploadChatimage();
      });
      }).catch(error => {
        console.log(error);
      });
    }
    catch (e) {
      console.log("Error" + JSON.stringify(e));
    }
  }

  uploadChatimage()
  {
    console.log("URL from image upload" + this.image_url);
    let newData = firebase.database().ref('chatrooms/' + this.roomkey + '/chats').push();
    newData.set({
      type: this.data.type,
      user: this.data.nickname,
      image: this.image_url,
      sendDate: Date(),
      uuid : this.uuid,
    });
    this.data.message = '';
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  check()
  {
    this.navCtrl.push(AudioPage);
  }

  settings()
  {
    const modal = this.modalCtrl.create(ChatsettingsPage, {roomname : this.roomname});
    modal.present();
  }

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


