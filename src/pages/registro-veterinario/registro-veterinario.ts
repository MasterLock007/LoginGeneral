import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  LoadingController,
  ToastController,
  NavParams,
  AlertController
} from "ionic-angular";
import { UsersserviceProvider } from "../../providers/usersservice/usersservice";
import * as firebase from "firebase";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-registro-veterinario",
  templateUrl: "registro-veterinario.html",
  providers: [UsersserviceProvider]
})
export class RegistroVeterinarioPage {
  //Datos de la cuenta
  public fecha_aceptacion: string = "" + new Date();
  public nombre: string;
  public email: string;
  public telefono: any;
  public pais: string = "México";
  public estado: string;
  public municipio: string;
  public contrasena: string;
  public tipoUsuario: string = "V";
  public cedula: string;
  public especialidad: string;
  //Variables condicionales, no almacenadas en la BD
  public terminos: boolean;
  public bandera1: boolean;
  public repetirContra: string;
  
  constructor(
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public usersserviceProvider: UsersserviceProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RegistroVeterinarioPage");
  }

  mostrarAlerta(msj1, msj2) {
    let alert = this.alertCtrl.create({
      title: msj1,
      subTitle: msj2,
      buttons: ["OK"]
    });
    alert.present();
  }

  validarCampos() {
    var terminos = this.terminos;
    var n=this.repetirContra.localeCompare(this.contrasena);
    if (
      this.nombre == null ||
      this.nombre == "" ||
      this.email == null ||
      this.email == "" ||
      this.telefono == null ||
      this.telefono == "" ||
      this.pais == null ||
      this.pais == "" ||
      this.estado == null ||
      this.estado == "" ||
      this.municipio == null ||
      this.municipio == ""||
      this.cedula == null ||
      this.cedula == "" ||
      this.especialidad == null ||
      this.especialidad == ""
    ) {
      this.mostrarAlerta("Error", "Completa todos los campos");
      this.bandera1 = false;
    } else if (this.telefono.length != 10) {
      this.mostrarAlerta(
        "Error",
        "El número de telefono debe tener 10 digitos"
      );
      this.bandera1 = false;
    } else if (this.contrasena.length < 6 || this.contrasena.length > 20) {
      this.mostrarAlerta(
        "Error",
        "La contraseña debe ser de 6 a 20 caracteres"
      );
      this.bandera1 = false;
    } else if (!terminos) {
      this.mostrarAlerta(
        "Error",
        "Debes aceptar los términos y condiciones de uso"
      );
      this.bandera1=false;
    } else if(this.cedula.length !=7){
      this.mostrarAlerta("Error","El número de cédula debe tener 7 dígitos");
      this.bandera1=false;
    }else if(n!=0){
      this.mostrarAlerta(
        "Error",
        "Las contraseñas no coinciden"
      );
      this.bandera1=false;
    } else {
      this.bandera1 = true;
    }
  }

  doSignup() {
    this.validarCampos();
    if (this.bandera1) {
      var account = {
        nombre: this.nombre,
        email: this.email || "",
        telefono: this.telefono || "",
        pais: this.pais || "",
        estado: this.estado,
        municipio: this.municipio || "",
        contrasena: this.contrasena || "",
        fecha_aceptacion: this.fecha_aceptacion || "",
        tipo_usuario: this.tipoUsuario || "",
        cedula: this.cedula || "",
        especialidad: this.especialidad || ""
      };
      var that = this;
      //Cuadro de carga
      var loader = this.loadingCtrl.create({
        content: "Cargando..."
      });
      loader.present();

      this.usersserviceProvider.signupUserService(account).then(
        authData => {
          //Registro exitoso
          loader.dismiss();
          that.navCtrl.setRoot(HomePage);
        },
        error => {
          loader.dismiss();
          // Fallo al registrar
          let toast = this.toastCtrl.create({
            message: error,
            duration: 3000,
            position: "top"
          });
          toast.present();

          that.contrasena = ""; //empty the password field
        }
      );
    }
  }
}
