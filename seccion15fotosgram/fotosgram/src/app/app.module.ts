
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule }  from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
           HttpClientModule,
           IonicModule.forRoot(), 
           AppRoutingModule,
           IonicStorageModule.forRoot()],
  providers: [
           { provide: RouteReuseStrategy,
                useClass: IonicRouteStrategy,
              },
              Geolocation,
              Camera,
              FileTransfer
              ],
  bootstrap: [AppComponent],
})
export class AppModule {}
