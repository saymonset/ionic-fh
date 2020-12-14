import { Component, OnInit } from '@angular/core';
import { RespuestaTopHeadlines } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[]  = [];

  constructor(private noticiasService: NoticiasService) {}
  ngOnInit(): void {
     this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }


  cargarNoticias(event?){
    this.noticiasService.getTopHeadLines().subscribe(
      (resp) => {
  
      //  console.log('Noticias with tilde:',resp);

        if (resp.articles.length === 0){
            event.target.disabled = true;
            event.target.complete();
            return;
        }
  
        //this.noticias  = resp.articles;
          this.noticias.push(...resp.articles);

          if (event){
              event.target.complete();
          }
      }
  )
  }
  
}

