import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController,LoadingController,ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public ROOT_URL = 'https://vision.googleapis.com';
  public API_KEY = 'AIzaSyDCeSjtkgELutZ4prPZBCjKPvw7RIQF3V8'; // YOUR CLOUD PLATFORM API KEY
  public visionRequest = {
    "requests": [{
        "image": {
          "content": ""
        },
        "features": [{
            "type": "TEXT_DETECTION",
            "maxResults": 10
        }]
    }]
  };
  public visionResult = {
    detectionConfidence: null
  };
  public imageResult = 'https://i.imgur.com/hyRulHk.gif';

  constructor(
    public http: HttpClient,
    public camera: Camera,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController
  ) {}

  capture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    let loader = this.loadingCtrl.create({
      content: "Processing..."
    });

    loader.present(); // show loading component

    this.camera.getPicture(options).then((imageData) => {
      this.visionRequest.requests[0].image.content = imageData;
      this.imageResult = 'data:image/jpeg;base64,' + imageData;
      this.http.post(`${this.ROOT_URL}/v1/images:annotate?key=${this.API_KEY}`, this.visionRequest)
      .subscribe((data: any) => {
        loader.dismiss(); // hide loading component
        //var result = data.responses[0];
        var length = data.responses[0].textAnnotations.length;
        var result = data.responses[0].textAnnotations[0].description;
        this.visionResult.detectionConfidence = result;
       /*let alert = this.alertCtrl.create({
          title: 'Ionic Vision',
          subTitle: data.responses[0].textAnnotations,
          buttons: ['OK']
        });
        alert.present();*/
      }, (err) => {
        loader.dismiss(); // hide loading component
        this.reset();
        this.showAlert('Vision API Request Error.');
        console.log("error occured");
      })
    }, (err) => {
      loader.dismiss(); // hide loading component
      this.reset();
      this.showAlert('Camera Error Occured.');
      console.log(err);
    });
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Ionic Vision',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  reset() {
    this.visionResult = {
      detectionConfidence: null
    };
    this.imageResult = 'https://i.imgur.com/hyRulHk.gif';
  }
}
