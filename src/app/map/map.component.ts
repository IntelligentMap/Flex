import { Component, OnInit, OnDestroy} from '@angular/core';
import * as Cartographer from '../../Cartographer/dist/cartographer.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnDestroy {

  map;

  constructor() { }

  ngOnInit() {
    var lat = 53.902262;
    var lng = 27.561840;

    if(localStorage.getItem("app-map-coords-lat")) {
      lat = parseFloat(localStorage.getItem("app-map-coords-lat"));
    }

    if(localStorage.getItem("app-map-coords-lng")) {
      lng = parseFloat(localStorage.getItem("app-map-coords-lng"));
    }

    this.map = Cartographer.map('map', {
      zoomControl: false
    }).setView([lat, lng], 7);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Cartographer.control.zoom({
      position:'bottomright'
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
      .on('locationfound', function(e){
        localStorage.setItem("app-map-coords-lat", e.latitude);
        localStorage.setItem("app-map-coords-lng", e.longitude);
      })
      .on('locationerror', function(e){
        console.log(e);
        alert("Location access denied.");
      });
  }

}
