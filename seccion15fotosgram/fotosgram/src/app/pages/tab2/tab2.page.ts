import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  cargandoGeo: boolean = false;
   
  post = {
    mensaje: '',
    coords: null,
    posicion: false
  };

  constructor(private postsService: PostsService,
    private route: Router) {}

  async crearPost(){

          console.log(this.post);

          const creado = await this.postsService.crearPost(this.post);
            this. post = {
              mensaje: '',
              coords: null,
              posicion: false
            };
         this.route.navigateByUrl('/main/tabs/tab1');   

  }

  getGeo(){
      //  console.log(this.post);
        if (!this.post){
            this.post.coords = null;
            return;
        }
        this.cargandoGeo = true;

     
     /*    this.geolocation.getCurrentPosition().then((resp) => {
          // resp.coords.latitude
          // resp.coords.longitude

          const coords = `${ resp.coords.latitude },${ resp.coords.longitude }`;
          console.log(coords)

          this.cargandoGeo = false;
        }).catch((error) => {
          console.log('Error getting location', error);
          this.cargandoGeo = false;
        }); */
  }

  
}
