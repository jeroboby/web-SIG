import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-component',
  templateUrl: './map-component.component.html',
  styleUrls: ['./map-component.component.css'],
})
export class MapComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapContainer: ElementRef;

  map: L.Map = null;

  montarnaud = {
    lat: 43.65,
    lng: 3.7,
  };

  saintGely = {
    lat: 43.7,
    lng: 3.8,
  };

  lattes = {
    lat: 43.5667,
    lng: 3.9,
  };

  montpellier = {
    lat: 43.6,
    lng: 3.8833,
  };

  mapAttribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

  openStreetMapStandardUrl =
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  openStreetOsmfranceUrl =
    'http://a.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

  mapBoxUrl =
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  zoomLevel = 12;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addControlLayer();
  }

  addControlLayer(): void {
    const cities = L.layerGroup();
    this.addMarkerLayer(cities);
    const grayscale = L.tileLayer(this.mapBoxUrl, {
      id: 'mapbox/light-v9',
      tileSize: 512,
      zoomOffset: -1,
      attribution: this.mapAttribution,
    });
    const streets = L.tileLayer(this.mapBoxUrl, {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      attribution: this.mapAttribution,
    });

    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.montpellier.lat, this.montpellier.lng],
      zoom: this.zoomLevel,
      layers: [grayscale, cities],
    });

    const baseLayers = {
      'Niveau de gris': grayscale,
      Routes: streets,
    };

    const overlays = {
      Cities: cities,
    };

    L.control.layers(baseLayers, overlays).addTo(this.map);
  }

  addMarkerLayer(cities: any): void {
    L.marker([this.montpellier.lat, this.montpellier.lng])
      .bindPopup('<b>Yo !</b><br>This is Montpel yeah !.')
      .addTo(cities);
    L.marker([this.montarnaud.lat, this.montarnaud.lng])
      .bindPopup('<b>Yo !</b><br>This is  Montar No !.')
      .addTo(cities);
    L.marker([this.saintGely.lat, this.saintGely.lng])
      .bindPopup('<b>Yo !</b><br>This is  saint Gely !.')
      .addTo(cities);
    L.marker([this.lattes.lat, this.lattes.lng])
      .bindPopup('<b>Yo !</b><br>This is  lattes !.')
      .addTo(cities);
  }

  addRoadLayer(): void {
    const roadArea = L.tileLayer
      .wms('http://localhost:8080/geoserver/carteEP/wms', {
        layers: 'carteEP:road',
        format: 'image/png',
        transparent: true,
      })
      .addTo(this.map);
  }
}
