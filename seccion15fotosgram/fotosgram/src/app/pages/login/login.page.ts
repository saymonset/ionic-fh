import { Usuario } from './../interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild ('slidePrincipal',{static:true}) slides: IonSlides;

  

loginUser = {
    email: 'fernando.herrera85@gmail.com',
    password: '123456'
}

registerUser: Usuario = {
 email:'test',
 password:'123456',
 nombre:'Test',
 avatar:'av-1.png'
}

  constructor(private usuarioService:UsuarioService,
    private navCtrl: NavController,
    private uiServiceService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){

    if (fLogin.invalid){
      return ;
    }

    const valido = await this.usuarioService.login(this.loginUser.email,this.loginUser.password);

      if (valido){
        // Navegar a los tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1',{ animated:true });
      }else{
        // Mostrar aletta de usuario y password no correctos
         this.uiServiceService.alertaInformativa('Usuario y password no son correctos.');
      }




    console.log(fLogin.valid);
    console.log(this.loginUser);

  }
  async registro(fRegistro: NgForm){

    console.log(fRegistro.valid);

    if (fRegistro.invalid){
      return ;
    }

    const valido = await this.usuarioService.registro(this.registerUser);

      if (valido){
        // Navegar a los tabs
        this.navCtrl.navigateRoot('/main/tabs/tab1',{ animated:true });
      }else{
        // Mostrar aletta de usuario y password no correctos
         this.uiServiceService.alertaInformativa('Ese correo electronico ya existe.');
      }


  }




     mostrarRegistro(){
         this.slides.lockSwipes(false);
         this.slides.slideTo(0);
         this.slides.lockSwipes(true);
     }

     mostrarLogin(){
         this.slides.lockSwipes(false);
         this.slides.slideTo(1);
         this.slides.lockSwipes(true);
     }
}
