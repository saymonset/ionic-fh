import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Pelicula, PeliculaDetalle } from '../../interfaces/interfaces';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  pelicula: PeliculaDetalle;

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
   
    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      resp => {
        this.pelicula = resp;
        console.log(resp);
      }
    );


    this.moviesService.getActoresPelicula(this.id).subscribe(
      resp => {
        console.log('actores = ',resp);
      }
    );

    

  }

}
