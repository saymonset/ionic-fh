import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  constructor(public modalController: ModalController) {

  }

  ngOnInit() {
  }
  
  async mostrarModal(){
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        nombre: 'Simon',
        pais: 'Venezuela',
        
      }
    });
    
    await modal.present();

    //onDidDismiss : La data la trae despues que cierra
    const {data} = await modal.onDidDismiss();
//onWillDismiss : La data la trae apenas empiece a cerrar
//    const {data} = await modal.onWillDismiss();

    console.log(data);
  }
}
