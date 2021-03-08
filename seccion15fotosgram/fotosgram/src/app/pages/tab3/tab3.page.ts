import { UsuarioService } from './../../services/usuario.service';
import { Usuario } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService:UsuarioService,
    private uiServiceService: UiServiceService) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.getUsuario();
    console.log('----------------------',this.usuario)
  }


 async actualizar(fActualizar: NgForm){
    if (fActualizar.invalid){
      return;
    }

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
     if (actualizado){
          // Toast del mensaje
          this.uiServiceService.presentToast('Registro Actualizado');
     }else{
       // Toast con el error
       this.uiServiceService.presentToast('No se pudo Actualizar');
     }

  }

  logout(){

  }
}
