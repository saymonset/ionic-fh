import { Component, OnInit } from '@angular/core';
import {  Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';
 
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];

  constructor(private moviesService: MoviesService) {}
  ngOnInit(): void {
    this.moviesService.getFeature().subscribe ( resp =>{
      console.log('resp',resp);
      this.peliculasRecientes = resp.results;
    });
  }

}
