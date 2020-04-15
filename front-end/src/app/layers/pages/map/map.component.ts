import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { Country } from './../../../models/country';
import { MarkersService } from './services/markers.service'; 
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

// set the marker icon
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map;
  datas : Country[] = [];

  constructor(private markerService: MarkersService,
              public languageService: LanguageService,
              private route: Router) {
              }

  ngOnInit(): void {
    // get datas from server
    this.markerService.getCountryData().subscribe(data=>{
      this.datas = data;
      console.log(data);
      console.log(this.datas);

      this.initMap();
      // this.markerService.makeCapitalMarkers(this.map);
      this.markerService.makeCapitalCircleMarkers(this.map, this.datas,
        [this.languageService.show('case'), this.languageService.show('death'), this.languageService.show('recovered')]);
    });

    this.languageService.change.subscribe(() => {
      console.log(123);
      if(this.languageService.opt == 1){
        this.route.navigate(['/en']);
      }
      else{
        this.route.navigate(['']);
      }
    })
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [26.8205528,  30.8024979],
      zoom: 2
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      maxNativeZoom: 29,
      minZoom: 2,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

}
