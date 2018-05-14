import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { RegistroVeterinarioPage } from '../pages/registro-veterinario/registro-veterinario';
import { SelectorRegistroPage } from '../pages/selector-registro/selector-registro';
import { OlvidoContrasenaPage } from '../pages/olvido-contrasena/olvido-contrasena';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { UsersserviceProvider } from '../providers/usersservice/usersservice';
import { ReadKeyExpr } from '@angular/compiler';
import { EstadosProvider } from '../providers/estados/estados';



// Initialize Firebase
export const config = {
      apiKey: "AIzaSyCG3dsLhdJhZGyC8Cq8ZxkClJkKrva6qVY",
      authDomain: "xoly-1d25f.firebaseapp.com",
      databaseURL: "https://xoly-1d25f.firebaseio.com",
      projectId: "xoly-1d25f",
      storageBucket: "xoly-1d25f.appspot.com",
      messagingSenderId: "892071817713"
    };
    firebase.initializeApp(config);
  

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    SelectorRegistroPage,
    RegistroVeterinarioPage,
    OlvidoContrasenaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    RegistroVeterinarioPage,
    SelectorRegistroPage,
    OlvidoContrasenaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersserviceProvider,
    EstadosProvider
  ]
})
export class AppModule {}
