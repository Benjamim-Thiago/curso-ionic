import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, Platform } from 'ionic-angular';

import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  myPhoto: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private actionSheet: ActionSheetController,
    private camera: Camera,
    private filePath: FilePath,
    private platform: Platform
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  choosePhoto() {
    let actionSheet = this.actionSheet.create({
      title: 'Selecione uma imagem',
      buttons: [
        {
          text: 'Tirar foto',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA, this.camera.MediaType.PICTURE);
          }
        },
        {
          text: 'Escolher foto',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY, this.camera.MediaType.PICTURE);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
}

  private takePhoto(source: number = 1, mediaType: number = 0) {
    const options: CameraOptions = {
      quality: 100,
      mediaType: mediaType,
      sourceType: source,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    }
    this.camera.getPicture(options)
      .then((imageData) => {
        if (source == 0 && this.platform.is('android')) {
          this.filePath.resolveNativePath(imageData)
            .then((filePath) => {
              this.myPhoto = filePath;
            })
        } else {
          this.myPhoto = imageData;
        }
      })
      .catch((err)=> {
        console.log(err)
      })
  }
  saveImage() {

  }

}
