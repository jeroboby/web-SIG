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
export class MapComponentComponent implements AfterViewInit {
  @ViewChild('mapElement', { static: false }) mapContainer: ElementRef;

  map: L.Map = null;

  constructor() {}

  ngAfterViewInit(): void {
    this.createMap();
    this.map.invalidateSize();
  }

  createMap(): void {
    const parcThabor = {
      lat: 43.65,
      lng: 3.7,
    };

    const zoomLevel = 12;
    this.map = L.map(this.mapContainer.nativeElement).setView(
      [parcThabor.lat, parcThabor.lng],
      zoomLevel
    );

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 9,
        maxZoom: 17,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    ).addTo(this.map);

    const roadArea = L.tileLayer
      .wms('http://localhost:8080/geoserver/carteEP/wms', {
        layers: 'carteEP:road',
        format: 'image/png',
        transparent: true,
      })
      .addTo(this.map);

    const marker = L.marker([parcThabor.lat, parcThabor.lng], {
      title: 'hello',
      opacity: 0.8,
    }).addTo(this.map);

    const circle = L.circle([48.12, -1.65], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500,
    }).addTo(this.map);

    const polygon = L.polygon(
      [
        [48.13, -1.65],
        [48.1, -1.659],
        [48.14, -1.651],
      ],
      {
        color: 'yellow',
        fillColor: 'white',
      }
    ).addTo(this.map);

    marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
    circle.bindPopup('I am a circle.');
    polygon.bindPopup('I am a polygon.');
  }
}
