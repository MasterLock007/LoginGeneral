import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController,
  ToastController
} from "ionic-angular";

import { LoginPage } from "../login/login";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";

@IonicPage()
@Component({
  selector: "page-olvido-contrasena",
  templateUrl: "olvido-contrasena.html",
  providers: [UsersserviceProvider]
})
export class OlvidoContrasenaPage {
  public email: string;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public usersService: UsersserviceProvider
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad OlvidoContrasenaPage");
  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }

  recuperarContrasena() {
    var that = this;
    var loader = this.loadingCtrl.create({
      content: "Enviando correo..."
    });
    loader.present();

    this.usersService.resetearContrasena(this.email).then(
      authData => {
        //Se envio el correo
        loader.dismiss();
        this.mostrarAlerta("Éxito","El correo fue enviado exitosamente");
        that.navCtrl.setRoot(LoginPage);
      },
      error => {
        loader.dismiss();
        // No se envio el correo
        let toast = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: "top"
        });
        toast.present();
      }
    );
  }
}
