import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetalle, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DatalocalService } from '../../services/datalocal.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  oculto = 150;

  estrella: string = 'star-outline';

  actores: Cast[] = [];

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5
  };

  pelicula: PeliculaDetalle;

  constructor(private moviesService: MoviesService,
    private modelCtrl: ModalController,
    private datalocalService: DatalocalService) { }

    ngOnInit() {

     this.datalocalService.existePelicula(this.id).then( existe =>  this.estrella = (existe) ? 'star' : 'star-outline');
     
   
    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      resp => {
        this.pelicula = resp;
        console.log(resp);
      }
    );


    this.moviesService.getActoresPelicula(this.id).subscribe(
      resp => {
        console.log('actores = ',resp);
        this.actores = resp.cast;
      }
    );
  }

  regresar(){
    this.modelCtrl.dismiss();
  }

  favorito(){
     
    const existe = this.datalocalService.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
