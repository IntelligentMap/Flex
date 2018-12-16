import { Component, OnInit, OnDestroy} from '@angular/core';
import * as Cartographer from '../../Cartographer/dist/cartographer.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnDestroy {

  map = Cartographer.map('map', {
    zoomControl: false
  });

  constructor() { }

  ngOnInit() {
    let lat = 53.902262;
    let lng = 27.561840;
    let zoom = 11;

    if(localStorage.getItem("app-map-state-lat") == null || localStorage.getItem("app-map-state-lng") == null) {
      this.map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
        .on('locationfound', function (e) {
          localStorage.setItem("app-map-state-lat", e.latitude);
          localStorage.setItem("app-map-state-lng", e.longitude);
          lat = parseFloat(localStorage.getItem("app-map-state-lat"));
          lng = parseFloat(localStorage.getItem("app-map-state-lng"));
        })
        .on('locationerror', function (e) {
          console.log(e);
        });
    } else {
      lat = parseFloat(localStorage.getItem("app-map-state-lat"));
      lng = parseFloat(localStorage.getItem("app-map-state-lng"));
    }

    if(!(localStorage.getItem("app-map-state-zoom") == null)) {
      zoom = parseInt(localStorage.getItem("app-map-state-zoom"));
    }

    this.map.setView([lat, lng], zoom);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Cartographer.control.zoom({
      position:'bottomright'
    }).addTo(this.map);
  }

  ngOnDestroy(): void {
    const center = this.map.getCenter();
    const zoom = this.map.getZoom();

    localStorage.setItem("app-map-state-lat", center.lat);
    localStorage.setItem("app-map-state-lng", center.lng);
    localStorage.setItem("app-map-state-zoom", zoom);
  }

}
