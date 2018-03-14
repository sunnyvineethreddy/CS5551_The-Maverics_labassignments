///<reference path="../login/login.ts"/>
import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ViewChild} from "@angular/core";
import {PatternValidator} from "@angular/forms";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('regEmail') regemail;
  @ViewChild('regPwd') regpwd;
  @ViewChild('regCnfPwd') regcnfpwd;



  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  register(){
    localStorage.setItem('username',this.regemail.value);
    localStorage.setItem('password',this.regpwd.value);
    let pattern=new RegExp("")

    if(this.regemail.value == "" || this.regpwd.value == "" || this.regpwd.value == "" ){
      let alert = this.alertCtrl.create({
        title: 'Registration UnSuccesful!',
        subTitle: 'Fields cannot be empty!',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.regpwd.value != this.regpwd.value){
      let alert = this.alertCtrl.create({
        title: 'Register UnSuccesful!',
        subTitle: 'Password and Confirm Password Must Match!',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Register Succesful!',
        subTitle: 'Registered Succesfully',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  public loginScreen(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
