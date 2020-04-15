import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Linechart00_model {
  date: string[];
  cases: number[];
  death: number[];
  recovered: number[];
}

export interface Piechart_model{
  label: string[];
  cases: number[];
}

export interface Barchart00_model{
  label: string[];
  cases: number[];
}

export interface Barchart01_model{
  labels: string[],
  new_cases: number[]
}

export interface Barchart02_model{
  labels: string[],
  new_deaths: number[]
}

export interface Barchart03_model{
  labels: string[],
  new_recovered: number[]
}

export interface Linechart01_model{
  date: string[];
  recovered_rate: number[],
  death_rate: number[]
}

export interface Linechart02_model{
  labels: string[];
  new_cases: number[];
  new_recovered: number[];
  new_deaths: number[];
}


@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  constructor(private http: HttpClient) { }

  api4_url : string = "https://api.corona.ngothithanhtruc.com/api4";
  getLineChart00_data(): Observable<Linechart00_model>{
    return this.http.get<Linechart00_model>(this.api4_url);
  }

  api5_url: string = "https://api.corona.ngothithanhtruc.com/api5";
  getPieChart_data(): Observable<Piechart_model>{
    return this.http.get<Piechart_model>(this.api5_url);
  }

  api6_url: string = "https://api.corona.ngothithanhtruc.com/api6";
  getBarChart00_data(): Observable<Barchart00_model>{
    return this.http.get<Barchart00_model>(this.api6_url);
  }

  api7_url: string = "https://api.corona.ngothithanhtruc.com/api7";
  getBarChart01_data(): Observable<Barchart01_model>{
    return this.http.get<Barchart01_model>(this.api7_url);
  }

  api8_url: string = "https://api.corona.ngothithanhtruc.com/api8";
  getBarChart02_data(): Observable<Barchart02_model>{
    return this.http.get<Barchart02_model>(this.api8_url);
  }

  api9_url: string = "https://api.corona.ngothithanhtruc.com/api9";
  getBarChart03_data(): Observable<Barchart03_model>{
    return this.http.get<Barchart03_model>(this.api9_url);
  }

  api10_url: string = "https://api.corona.ngothithanhtruc.com/api10";
  getLineChart01_data(): Observable<Linechart01_model>{
    return this.http.get<Linechart01_model>(this.api10_url);
  }

  api11_url: string = "https://api.corona.ngothithanhtruc.com/api11";
  getLineChart02_data(): Observable<Linechart02_model>{
    return this.http.get<Linechart02_model>(this.api11_url);
  }

}
