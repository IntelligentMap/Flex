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
    let lat;
    let lng;

    this.map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
      .on('locationfound', function(e){
        lat = e.latitude;
        lng = e.longitude;
      })
      .on('locationerror', function(e){
        console.log(e);
        lat = 53.902262;
        lng = 27.561840;
      });

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
    localStorage.setItem("app-map-state", this.map)
  }

}
