import { Component } from '@angular/core';

import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  buscando = false;

  peliculas: Pelicula[] = [];

  textoBuscar: string= '';
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];

  buscar(event){
     //console.log(event);
    const valor:string = event.detail.value;
    if (valor.length ===0){
      this.buscando = false;
      this.peliculas = [];
      return;
    }
    this.buscando = true;
    this.moviesService.buscarPeliulas(valor).subscribe(
      resp => {
        this.peliculas = resp['results'];
        this.buscando = false;
        console.log(resp);
        
      }
    );
  }

 

  async detalle(id: string){
    const modal =  await this.modalCtrl.create(
        {component: DetalleComponent,
        componentProps:{
          id
        }}
      );
      modal.present();
    }

  constructor(private moviesService: MoviesService,
              private modalCtrl: ModalController) {
    
  }

}
