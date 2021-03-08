import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];
  habilitado: boolean = true;
  constructor( private postsService: PostsService) {}


  ngOnInit(): void {
     this.siguientes();
     this.postsService.nuevoPost
     .subscribe(post=>{
        this.posts.unshift(post);
     });
  }

  siguientes(event?:any, pull: boolean = false){

   
   
    this.postsService.getPosts(pull)
    .subscribe(resp=>{
      this.posts.push(...resp.posts);
          console.log(resp);
          if (event){
             event.target.complete();

             if (resp.posts.length === 0){
                 this.habilitado = false;
                 /***Desactiva definitivamente el scroll */
                 // event.target.disabled = habilitado;
             }

          }
     });
  }

      recargar(event:any){
          this.siguientes(event, true);
          this.posts = [];
          this.habilitado = true
      }

}
