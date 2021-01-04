import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage,
    public toastController: ToastController) { 
      this.cargarFavoritos();
    }


    async presentToast(mesage: string) {
      const toast = await this.toastController.create({
        message: mesage,
        duration: 2000
      });
      toast.present();
    }
  

  guardarPelicula(pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas){
        if (peli.id===pelicula.id){
          existe = true;
          break;
        }
    }
    if (existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de la pelicula';
    }else{
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos..';
    }

    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
      
  }



  async cargarFavoritos(){
             const peliculas = await this.storage.get('peliculas');
             this.peliculas = peliculas || [];
             return peliculas;
  }

  async existePelicula(id){
    id = Number(id);
    await this.cargarFavoritos();
     const existe = this.peliculas.find(e => e.id === id);
     return (existe) ? true:  false;

  }



}
