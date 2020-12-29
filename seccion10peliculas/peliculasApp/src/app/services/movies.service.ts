import { RespuestaCredits } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeliculaDetalle, RespuestaMDB } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage: number = 0;

  constructor(private httpClient: HttpClient) { }

  private ejecutarQuery<T>(query: string){

    query = URL + query;
    query += `&api_key=${ apiKey }&language=es&include_image_language=es`;
    //console.log('saymon: ',query);
    return this.httpClient.get<T>( query );
  }


  getPopulares(){

    ++this.popularesPage;
    const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage}`;
    
    return this.ejecutarQuery<RespuestaMDB>(query);
  }

  getFeature(){
    const hoy = new Date();
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0); //new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate;
    const mes = hoy.getMonth() + 1;
    let mesString = '';
    if (mes < 10 ){
      mesString ='0' + mes;
    }else{
      mesString = mes+'';
    }
    const inicio = `${ hoy.getFullYear() -1 }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-31`;
      // "2019 - 12 - 01"
    console.log({ inicio, fin});

  //return this.httpClient.get<RespuestaMDB>(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-01-01&primary_release_date.lte=2020-12-18&api_key=c8120d5570fbe95bb8a6b65f8bdfe782&language=es&include_image_language=es`);
    return  this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
  }

  getPeliculaDetalle(id: string){
    return  this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
  }

  getActoresPelicula(id: string){
    ///movie/{movie_id}/credits
    return  this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
  }

}
