import { Component, OnInit } from '@angular/core';
import * as Cartographer from '../../assets/Cartographer/dist/cartographer.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = Cartographer.map('map', {
      zoomControl: false
    }).setView([53.902262, 27.561840], 7);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Cartographer.control.zoom({
      position:'bottomright'
    }).addTo(map);
  }

}
