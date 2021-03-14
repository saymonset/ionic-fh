import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';


declare var mapboxgl: any;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements OnInit, AfterViewInit {
  
  @Input("coords") coords: string;
  
 @ViewChild('mapa', { static: true }) mapa: any;


  constructor() { }

  ngOnInit() {
    const latLng = this.coords.split(',');
    const lat = Number(latLng[0]);
    const lng = Number(latLng[1]);

      mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5bW9uc2V0IiwiYSI6ImNranVsYzF3ZDA3cXEyeHFsenNvcW5rcW0ifQ.oun1-uUdVPB0wfqF67IeFA';
      const map = new mapboxgl.Map({
      container: this.mapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [ lng, lat ],
      zoom: 15
      });


      const marker = new mapboxgl.Marker()
            .setLngLat( [ lng, lat ] )
            .addTo( map );

  }

  ngAfterViewInit(){

  }

  ionViewDidEnter(){
  
  }

}
