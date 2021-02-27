import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { }

  configuracionInicial(){
                this.oneSignal.startInit('1a89f33a-9b83-45ce-98b0-5191072ec9ad', '1045931834265');
                 
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

                this.oneSignal.handleNotificationReceived().subscribe((noti) => {
                // do something when notification is received
                console.log('Notificacion recibida...', noti);
                });

                this.oneSignal.handleNotificationOpened().subscribe((noti) => {
                  // do something when a notification is opened
                  console.log('Notificacion abierta...', noti);
                });

                this.oneSignal.endInit();
  }
}
