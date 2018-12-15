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
    var x = 53.902262;
    var y = 27.561840;
    var z = 7;

    if(localStorage.getItem("app-map-coords-x")) {
      x = parseFloat(localStorage.getItem("app-map-coords-x"));
    }

    if(localStorage.getItem("app-map-coords-y")) {
      y = parseFloat(localStorage.getItem("app-map-coords-y"));
    }

    if(localStorage.getItem("app-map-coords-z")) {
      z = parseFloat(localStorage.getItem("app-map-coords-z"));
    }

    this.map = Cartographer.map('map', {
      zoomControl: false
    }).setView([x, y], z);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Cartographer.control.zoom({
      position:'bottomright'
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    const coords = this.map.getCenter();
    localStorage.setItem("app-map-coords-x", coords.x);
    localStorage.setItem("app-map-coords-y", coords.y);
    localStorage.setItem("app-map-coords-z", coords.z);
  }

}
