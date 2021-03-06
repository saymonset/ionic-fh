import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];


  capturedSnapURL:string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  cargandoGeo: boolean = false;


   
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postsService: PostsService,
    private route: Router,
    private geolocation : Geolocation,
    private camera: Camera) {}

  async crearPost(){

          console.log(this.post);

          const creado = await this.postsService.crearPost(this.post);
            this. post = {
              mensaje: '',
              coords: null,
              posicion: false
            };

          
         this.tempImages = [];   
            
         this.route.navigateByUrl('/main/tabs/tab1');   

  }

  getGeo(){
      //  console.log(this.post);
        if (!this.post){
            this.post.coords = null;
            return;
        }


        this.cargandoGeo = true;
        this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude

          const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;
          console.log(coords)
          this.cargandoGeo = false;
          this.post.coords = coords;
        }).catch((error) => {
          console.log('Error getting location', error);
          this.cargandoGeo = false;
        }); 
  }

 

  camara(){
    
            const options: CameraOptions = {
              quality: 60,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE,
              correctOrientation: true,
              sourceType: this.camera.PictureSourceType.CAMERA
            }

            this.procesarImagen( options);
  }



  libreria(){
    
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.procesarImagen( options);
}


    procesarImagen( options : CameraOptions){
      this.camera.getPicture(options).then((imageData) => {
        
        const img = window.Ionic.WebView.convertFileSrc( imageData );

        this.postsService.subirImagen( imageData );
        this.tempImages.push(img);
        }, (err) => {
        // Handle error
        });
    }

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });
  }

  
}
