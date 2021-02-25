import { EmailComposer } from '@ionic-native/email-composer/ngx';
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
   

   constructor(private file: File, private storage: Storage,
     private  navController: NavController, 
     private inAppBrowser: InAppBrowser,
     private emailComposer:EmailComposer) { 
                /* this.storage.get('registros')
                    .then( registros => {
                      this.guardados = registros || [];
                    }); */
      // this.cargarStorage();
   }

   async cargarStorage(){
         this.guardados =  await this.storage.get('registros')  || [] ;
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
    this.crearArchivoFico(arrTemp.join(''));
  }

  crearArchivoFico(text: string){
            this.file.checkFile(this.file.dataDirectory, 'registros.csv')
            .then(existe => {
              console.log('Existe archivo?', existe);
              return this.escribirEnArchivo(text);
            }).catch(err=>{
              return this.file.createFile(this.file.dataDirectory, 'registros.csv',false)
              .then(creado=>{
                return this.escribirEnArchivo(text);
              }).catch(err2=>
                console.log('No se pudo crear el archivo',err2));
            })
  }

  async escribirEnArchivo(text: string){
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log('objeArchivo creado');
    const archivo = `${this.file.dataDirectory}/registros.csv`;
    console.log(this.file.dataDirectory + 'registros.csv');
    let email = {
      to: 'saymon_set@hotmail.com',
      //cc: 'erika@mustermann.de',
      bcc: ['oraclefedora@gmailcom'],
      attachments: [
        archivo
      ],
      subject: 'Backup de saymons',
      body: 'Aqui esta sus backups de los scanners <strong>saymons</strong>',
      isHtml: true
    }
    
    // Send a text message using default options
    this.emailComposer.open(email);
    
  }
}
