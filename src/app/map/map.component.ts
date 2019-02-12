import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Cartographer from 'cartographerjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit, OnDestroy {

  map;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    let lat = 53.902262;
    let lng = 27.561840;
    let zoom = 11;

    this.map  = Cartographer.map('map', {
      zoomControl: false
    });

    this.route.fragment.subscribe((fragment: string) => {
      if(fragment != null) {
        const fragment_coords = fragment.split(':');
        const fragment_lat = fragment_coords[0];
        const fragment_lng = fragment_coords[1];
        const fragment_zoom = fragment_coords[2];
        if (fragment_lat != null && fragment_lng != null && fragment_zoom != null) {
          lat = parseFloat(fragment_lat);
          lng = parseFloat(fragment_lng);
          zoom = parseFloat(fragment_zoom);
        }
      } else {
        if (localStorage.getItem('app-map-state-lat') == null || localStorage.getItem('app-map-state-lng') == null) {
          this.map.locate({setView: true, watch: true}) /* This will return map so you can do chaining */
            .on('locationfound', function (e) {
              localStorage.setItem('app-map-state-lat', e.latitude);
              localStorage.setItem('app-map-state-lng', e.longitude);
              lat = parseFloat(localStorage.getItem('app-map-state-lat'));
              lng = parseFloat(localStorage.getItem('app-map-state-lng'));
            })
            .on('locationerror', function (e) {
              console.log(e);
            });
        } else {
          lat = parseFloat(localStorage.getItem('app-map-state-lat'));
          lng = parseFloat(localStorage.getItem('app-map-state-lng'));
        }

        if(!(localStorage.getItem('app-map-state-zoom') == null)) {
          zoom = parseInt(localStorage.getItem('app-map-state-zoom'));
        }
      }
    });

    this.map.setView([lat, lng], zoom);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Cartographer.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    this.map.on('moveend', this.saveMapState);
    this.map.on('move', this.saveMapState);
    this.map.on('zoomend', this.saveMapState);
    this.map.on('zoom', this.saveMapState);
  }

  ngOnDestroy(): void {

  }

  saveMapState(event) {
    const center = event.target.getCenter();
    const zoom = event.target.getZoom();

    window.location.hash = [center.lat, center.lng, zoom].join(':');

    localStorage.setItem('app-map-state-lat', center.lat);
    localStorage.setItem('app-map-state-lng', center.lng);
    localStorage.setItem('app-map-state-zoom', zoom);
  }

}
