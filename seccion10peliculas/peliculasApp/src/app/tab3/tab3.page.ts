import { Genre, PeliculaDetalle } from './../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];


  constructor(private datalocalService: DatalocalService,
              private moviesService: MoviesService) {}


   ngOnInit() {
 
  }


  async ionViewWillEnter(){
    this.peliculas = await this.datalocalService.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero( this.generos, this.peliculas);  
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]){
          this.favoritoGenero = [];

          generos.forEach( genero => {
            this.favoritoGenero.push({
              genero: genero.name,
              pelis : peliculas.filter( peli => {
                return peli.genre_ids.find( genre => genre === genero.id)
              })
            // pelis: peliculas.filter ( peli =>  peli.genre_ids.find( genre => genre === genero.id))
            });
          });

          console.log(this.favoritoGenero)
  }

}
