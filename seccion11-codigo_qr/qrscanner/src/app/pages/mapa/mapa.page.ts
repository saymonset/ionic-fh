import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit, AfterViewInit {

  lat: number;
  lng: number;


  constructor(private route: ActivatedRoute) { }
  ngAfterViewInit(): void {
    
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2F5bW9uc2V0IiwiYSI6ImNranVsYzF3ZDA3cXEyeHFsenNvcW5rcW0ifQ.oun1-uUdVPB0wfqF67IeFA';
          

    var map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.lat, this.lng],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
      });


      
// The 'building' layer in the mapbox-streets vector source contains building-height
// data from OpenStreetMap.
map.on('load', function () {
      map.resize();
      // Insert the layer beneath any symbol layer.
      var layers = map.getStyle().layers;
      
      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
      labelLayerId = layers[i].id;
      break;
      }
  }
   
  map.addLayer(
            {
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
            'fill-extrusion-color': '#aaa',
            
            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
            ],
            'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
            }
            },
            labelLayerId
            );
  });
  }

  ngOnInit() {
    let geo: any = this.route.snapshot.paramMap.get('geo');
    console.log(geo);
    geo = geo.substring(4);
    geo = geo.split(',');

    this.lat = Number(geo[0]);
    this.lng = Number(geo[1]);
    console.log(this.lat * 1, this.lng);
  }

}
