import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatisticItem } from '../layers/pages/statistic/statistic-datasource';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  
  url : string = "https://api.corona.ngothithanhtruc.com/api3";
  getData(): Observable<StatisticItem[]>{
    return this.http.get<StatisticItem[]>(this.url);
  }
}
