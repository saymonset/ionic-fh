import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RespuestaPosts, Post } from '../pages/interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }


  getPosts(pull:boolean = false):Observable<RespuestaPosts> {

    if (pull){
      this.paginaPosts = 0;
    }
    this.paginaPosts ++;

    return this.http.get<RespuestaPosts>(`${ URL }/posts?pagina=${ this.paginaPosts }`); 
  }
  

  crearPost(post){
     const headers = new HttpHeaders({'x-token': this.usuarioService.token});

     return new Promise ((resolve, reject)=>{
          this.http.post(`${ URL }/posts`, post, { headers })
          .subscribe(resp=> {
            console.log(resp);
            this.nuevoPost.emit(resp['post']);
            resolve(true);
          });
     });
  }

}
