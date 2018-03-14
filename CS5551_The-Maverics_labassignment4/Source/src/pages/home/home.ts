import { Component } from '@angular/core';
import {AlertController, List, NavController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  private imagesArray: List;
  private errorArray: List;

  constructor(public navCtrl: NavController, private camera: Camera, public alertCtrl: AlertController, public http: Http) {

  }
  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image= 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }
  getFaceAnalysis(base64Image){

    // Adding Header Fields for Kairos POST Request
    let header = new Headers();
    header.append('Content-Type','application/json');
    header.append('app_id' ,'5c47b40a');
    header.append('app_key','2ae69b733e7951a5dc84b4c6740b11ad');

    // Setting Body JSON
    let body = {'image' : base64Image, 'selector' : 'ROLL'};

    this.http.post('http://api.kairos.com/detect',body, {headers : header}).map(res => res.json()).subscribe(data =>
    {
      console.log(data);
      this.imagesArray = data.images;
      this.errorArray = data.Errors;
    }, error => {
      let alert = this.alertCtrl.create({
        title: 'Failure',
        subTitle: error,
        buttons: ['OK']
      });
      alert.present();
      console.log(error);// Error getting the data
    });

  }

}
