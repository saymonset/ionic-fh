import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
//import * as EventEmitter from 'events';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: OSNotificationPayload[] = [
    /* {
    title: 'Titulo de la push',
    body: 'Este ews el body de la push',
    date : new Date()
  } */
];

  pushListener = new EventEmitter<OSNotificationPayload>();

  constructor(private oneSignal: OneSignal,
    private storage: Storage) { 
     
      this.cargarMensajes();

    }


    async getMensajes(){

      await this.cargarMensajes();
      return [...this.mensajes];
    }




  configuracionInicial(){
                this.oneSignal.startInit('1a89f33a-9b83-45ce-98b0-5191072ec9ad', '1045931834265');
                 
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption
                  .Notification);

                this.oneSignal.handleNotificationReceived().subscribe((noti) => {
                // do something when notification is received
                console.log('Notificacion recibida...', noti);
                this.notificacionRecibida( noti );
                });

                this.oneSignal.handleNotificationOpened().subscribe((noti) => {
                  // do something when a notification is opened
                  console.log('Notificacion abierta...', noti);
                });

                this.oneSignal.endInit();
  }

  async notificacionRecibida(noti: OSNotification){
      
    await this.cargarMensajes();

    const payload = noti.payload;



      const existPush = this.mensajes.find(mensaje => mensaje.notificationID === 
        payload.notificationID);
        if (existPush){
          return ;
        }
       this.mensajes.unshift( payload );
       this.pushListener.emit(payload);

       this.guardarMensajes();

  }

  guardarMensajes(){
    this.storage.set('mensajes',this.mensajes);
  }

  async cargarMensajes(){
    this.mensajes = await this.storage.get('mensajes') || [];
  }

}
