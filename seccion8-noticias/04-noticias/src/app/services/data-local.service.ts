import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
    public toastController: ToastController) { 
    

    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia(noticia: Article){

    const existe = this.noticias.find(e=>e.title === noticia.title);
    console.log(noticia.title + ',  '+ existe);

    if (!existe){
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);
    }

    this.presentToast('Agregado a favorito');
    

  }


  async borrarNoticia(noticia: Article){

      this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
      this.storage.set('favoritos', this.noticias);
      this.presentToast('Borrado de favoritos');
  }

  async cargarFavoritos(){

  /*   this.storage.get('favoritos').then(favoritos => {
        console.log('favoritos',favoritos);
    }); */
     //return await this.storage.get('favoritos');

     const favoritos = await this.storage.get('favoritos');

     if (favoritos){
      this.noticias = favoritos;
      console.log('async await favoritos',favoritos);
     }


  }

}
