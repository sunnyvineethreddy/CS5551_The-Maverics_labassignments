import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {ViewChild} from "@angular/core";
import {RegisterPage} from "../register/register";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  @ViewChild('lgnEmail') lgnemail;
  @ViewChild('lgnPwd') lgnpwd;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {

  }

  loginAccount(){
    var loginusername = localStorage.getItem('username');
    var loginpassword = localStorage.getItem('password');

    if(this.lgnemail.value == "" || this.lgnpwd.value == ""){
      let alert = this.alertCtrl.create({
        title: 'Login UnSuccesful!',
        subTitle: 'Fields cannot be empty!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.lgnemail.value != loginusername || this.lgnpwd.value != loginpassword){
      let alert = this.alertCtrl.create({
        title: 'Login UnSuccesful!',
        subTitle: 'Username or Password is incorrect!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.lgnemail.value == loginusername && this.lgnpwd.value == loginpassword){
      let alert = this.alertCtrl.create({
        title: 'Login Succesful!',
        subTitle: 'Logged in Successfully!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(HomePage);
    }
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
