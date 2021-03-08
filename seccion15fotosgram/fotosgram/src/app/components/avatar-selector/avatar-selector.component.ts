import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
 

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {


   @Output() avatarSet = new EventEmitter<string>();
   @Input() avatarActual: string = 'av-1.png';


  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

avatarSlide = {
     slidesPerView: 3.5
};

  constructor() { }

  ngOnInit() {

    this.avatars.forEach(avatar => avatar.seleccionado=false);

    for(const avatar of this.avatars){

      if (avatar.img === this.avatarActual){
         avatar.seleccionado = true;
         this.avatarSet.emit(this.avatarActual);
         break;
      }

    }

  }

  seleccionarAvatar( avatar ) {
    
    this.avatars.forEach(ava=>{
       ava.seleccionado = false;
    });

      avatar.seleccionado = true;
      console.log(avatar.img)
      this.avatarSet.emit(avatar.img);
  }


}
