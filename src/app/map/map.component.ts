import { Component, OnInit } from '@angular/core';
import * as Cartographer from '../../assets/cartographer.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})

export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var map = Cartographer.map('map', { zoomControl: false }).setView([51.505, -0.09], 13);

    Cartographer.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Cartographer.control.zoom({
      position:'bottomright'
    }).addTo(map);
  }

}
