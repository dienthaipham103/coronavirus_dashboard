import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopUpService } from './pop-up.service';
import { Country } from './../../../../models/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {

  static ScaledRadius(val: number, maxVal: number): number {
    if(val < 100){
      return 2
    }
    else if(val < 1000){
      return 3
    }
    return 3 + 0.1*Math.floor(val / 1000)

  }

  constructor(private http: HttpClient,
              private popupService: PopUpService) { }

  countryUrl : string = "https://api.corona.ngothithanhtruc.com/api2";
  getCountryData(): Observable<Country[]>{
    return this.http.get<Country[]>(this.countryUrl);
  }

  makeCapitalMarkers(map: L.map, datas: Country[]): void {
    for(let data of datas){
      const lat = data.lat;
      const lon = data.lon;
      const marker = L.marker([lat, lon]).addTo(map);
    }
  }

  makeCapitalCircleMarkers(map: L.map, datas: Country[], text: string[]): void {
    // Find the maximum values
    const nums = datas.map(i => i.cases);
    const maxVal = Math.max(...nums);

    for(let data of datas){
      const lat = data.lat;
      const lon = data.lon;
      const circle = L.circleMarker([lat, lon],
        {
          radius: MarkersService.ScaledRadius(data.cases, maxVal),
          color: 'tomato',
          stroke: false,
          fillOpacity: 0.7,
          popup: "Transamerica Pyramid"
        });
      circle.bindTooltip(this.popupService.makeCapitalTooltip(data.country, data.cases, data.deaths, data.recovered, text));

      circle.addTo(map);
    }
  }

}
