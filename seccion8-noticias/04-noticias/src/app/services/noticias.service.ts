import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Query } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';


const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-Key': apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headlinesPage = 0;

  categoriaActual:string = '';
  categoriaPage :number = 0;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){

    query = apiUrl + query;

    return this.http.get<T>(query, { headers } );

   }

  getTopHeadLines(){

       this.headlinesPage++;
       return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us`);
  }
  

  getTopHeadlinesCategoria(categoria: string){

    if  (this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual =  categoria;
    }
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=de&category=${{categoria}}&apiKey=6de74af3c5b64cf9b1633872d8046185`);
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}&page=${this.categoriaPage}`);
  }
}
