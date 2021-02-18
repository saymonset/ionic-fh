import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
   
   guardados: Registro[] = [];
   

   constructor(private file: File, private storage: Storage, private  navController: NavController, private inAppBrowser: InAppBrowser) { 
                /* this.storage.get('registros')
                    .then( registros => {
                      this.guardados = registros || [];
                    }); */
      // this.cargarStorage();
   }

   async cargarStorage(){
         this.guardados = await this.storage.get('registros') || [] ;
   }

  async guardarRegistro(format: string, text: string){
  
     await this.cargarStorage();
     const nuevoRegistro =  new Registro(format, text);
     this.guardados.unshift( nuevoRegistro );
       // set a key/value
     this.storage.set('registros', this.guardados);
      //console.log(this.guardados);
      this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro){
            this.navController.navigateForward('/tabs/tab2');

            switch ( registro.type ){
                case 'http':
                  this.inAppBrowser.create(registro.text, '_system');
                  break;

                  case 'geo':
                 // this.inAppBrowser.create(registro.text, '_system');
                 this.navController.navigateForward(`/tabs/tab2/mapa/${ registro.text }`);
                  break;     
            } 

  }

  enviarCorreo(){
    
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto \n';
    arrTemp.push(titulos);
    this.guardados.forEach(registro =>{
         const linea = `${registro.type}, ${registro.format},${registro.created},${registro.text.replace(',','')} \n`;          
         arrTemp.push(linea);
    });

    console.log(arrTemp.join(''));
    this.crearArchivoFiico(arrTemp.join(''));
  }

  crearArchivoFiico(text: string){
            this.file.checkFile(this.file.dataDirectory, 'registros.csv')
            .then();
  }
}
