import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';


             
const URL = environment.imgPath;//'https://image.tmdb.org/t/p';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

    if ( !img) {
      return './assets/no-image-banner.jpg'
    }

     const imgUrl = `${ URL }/${ size }${ img }`
   // console.log('imgUrl', imgUrl);
    return imgUrl;
  }

}

