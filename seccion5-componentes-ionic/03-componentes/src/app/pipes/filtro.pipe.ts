import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string = ''): any[] {
   // console.log(arreglo);
    

    if (texto === ''){
      return arreglo;
    }

    if (!arreglo){
      return arreglo;
    }
           // texto = texto.toLocaleLowerCase;
           
            console.log(texto);

            let out =  arreglo.filter(
              el => el.title.toLowerCase().includes(texto));

              console.log(out);

    return out;
    
  }

}
