import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HomePage } from '../home/home';
//Camera options
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {
  user_id: any;
  apiUrl: string;
  posts: any;
  name: any;
  profile_picture: any;
  url: string;
  imageURI: string;
  image_value: string;
  email: any;

  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, public alertCtrl: AlertController, private http: Http, private loadingCtrl: LoadingController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('user_id')
    .then(
      data => {
        console.log("Checking for City name:" + data);
        this.user_id = data;
        this.fetch_user_data();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  fetch_user_data()
  {
      let loader = this.loadingCtrl.create({
        content: "Loading Profile..."
      });
      loader.present();
  
      this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/fetch_user_data.php?id=' + this.user_id;
       console.log(this.apiUrl);
  
       this.http.get(this.apiUrl).map(res => res.json())
       .subscribe(data => {
          
        this.posts = data;
        console.log(this.posts);
  
        this.name = this.posts.name;
        this.email = this.posts.email;
        this.profile_picture = this.posts.profile_pic;
        
        loader.dismiss();
        console.log(this.posts);
   
        }, error => {
          console.log(error); // Error getting the data
    
        }); 
  }

  signup() {
    if (this.name === undefined) {

        let alert = this.alertCtrl.create({
            title: 'You cannot leave Name field empty ! ',
            buttons: ['OK']
          });
          alert.present();        
    }

    else {
         let loader = this.loadingCtrl.create({
            content: "Updating Profile..."
        });
        loader.present();

        this.apiUrl = 'https://purpledimes.com/James-Horse/mobile/update_user_profile.php?name=' + this.name + '&id=' + this.user_id;
       
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
           loader.dismiss();

                console.log("After upload" + JSON.stringify(data));
      
                var status = data.Status;

                if(status === 'success')
                {
                  let alert = this.alertCtrl.create({
                    title: 'Updated Successful',
                    buttons: ['OK']
                  });
                  alert.present();

                  if(this.image_value === '1')
                  {
                    this.uploadImage();
                  }
                  else{
                    //this.navCtrl.push(Home);
                    this.fetch_user_data();
                  }
        }
              else
                {
                  let alert = this.alertCtrl.create({
                    title: 'Profile Updation Failed ! Server Problem',
                    buttons: ['OK']
                  });
                  alert.present();
                }
               
            }, error => {
                console.log(error);// Error getting the data
            });
    }
}

  //Upload image:
  public presentActionSheet() {
    this.image_value = '1';
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            //this.Alertconfirm();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  
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
      this.profile_picture = imagePath;
      console.log("ImageURL ",this.profile_picture)
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
  
  // Always get the accurate path to your apps folder
  
  
  public uploadImage() {
    // File for Upload
    console.log(this.profile_picture)
    var targetPath = this.profile_picture
  
    var temp= this.profile_picture.replace(".png?","_");
    var temp1=temp.replace(".jpg?","_");
    // File name only
    var filename = temp1;
  
    var options = {
      fileKey: "file",
      fileName:filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'fileName': filename }
    };
  
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let loadingCtrl = this.loadingCtrl.create({
      content: 'Validating resources...',
    });
    loadingCtrl.present();
       this.url = "https://purpledimes.com/James-Horse/mobile/image.php?id=" + this.user_id; 
      console.log(this.url)
      fileTransfer.upload(this.profile_picture, this.url, options).then(data => {
        console.log("FiletransferObject URl",this.profile_picture)
      loadingCtrl.dismissAll()
      console.log("image uploaded");

        this.navCtrl.push(EditprofilePage);

      console.log("data",data)
      let alert = this.alertCtrl.create({
        title: 'Profile Updated Successfully!',
        buttons: ['OK']
      });
      alert.present();
    }, err => {
      loadingCtrl.dismissAll()
      console.log("Failed uploading image", err);
    });
  
  }
}
