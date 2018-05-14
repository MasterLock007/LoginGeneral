import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase';

@Injectable()



export class UsersserviceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;

  constructor(public http: Http) {
     this.fireAuth = firebase.auth();

  	 this.userProfile = firebase.database().ref('users');
  }


  loginUserService(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }


  signupUserService(account: {}){
        return this.fireAuth.createUserWithEmailAndPassword(account['email'], account['contrasena']).then((newUser) => {
          //sign in the user
          this.fireAuth.signInWithEmailAndPassword(account['email'], account['contrasena']).then((authenticatedUser) => {
            //successful login, create user profile
          this.userProfile.child(authenticatedUser.uid).set(
            account
          );
          });
        });

  }

  cerrarSesion(){
    this.fireAuth.signOut();
  }

  resetearContrasena(email: string){
    return this.fireAuth.sendPasswordResetEmail(email).then(function() {
      //Exito
    }).catch(function(error) {
      // Un error ocurrio
    });
    
  }



}
