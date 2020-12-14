import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment) segment: IonSegment;
  valueFirst: string = '';

  categorias= ['entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}


  ngOnInit(): void {
     // this.segment.value = 'entertainment';
      this.valueFirst = this.categorias[0];
      this.cargarNoticias(this.valueFirst);
  
  }


  cambioCategoria( event ){

    this.noticias = [];

    this.cargarNoticias(event.detail.value);
  }

  cargarNoticias(categoria: string, event?){

    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(e => {
   //   console.log(e)
      this.noticias.push(...e.articles);

      if (event){
        event.target.complete();
      }

    });
  }


  loadData(event){
         this.cargarNoticias( this.valueFirst, event );
  }

}
