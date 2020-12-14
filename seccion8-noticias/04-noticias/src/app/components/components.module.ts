import { NoticiasComponent } from './noticias/noticias.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NoticiasComponent, 
    NoticiaComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiasComponent
  ]
})
export class ComponentsModule { }
