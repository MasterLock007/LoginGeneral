import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../../providers/usersservice/usersservice';
import { LoginPage } from "../login/login";

//import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [UsersserviceProvider]
})
export class HomePage {

  constructor(public navParams: NavParams,public usersserviceProvider : UsersserviceProvider,public navCtrl: NavController) {

  }

  cerrarSesionUser(){
    this.usersserviceProvider.cerrarSesion();
    this.navCtrl.setRoot(LoginPage); 
  }

}
