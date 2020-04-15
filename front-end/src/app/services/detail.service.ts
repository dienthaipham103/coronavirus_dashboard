import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DetailInfo_model{
  cases: number;
  deaths: number;
  recovered: number;
  death_rate: number;
  recovered_rate: number;
}

export interface DetailLinechart00_model{
  date: string[];
  cases: number[];
  deaths: number[];
  recovered: number[];
}

export interface DetailLinechart01_model{
  labels: string[];
  new_cases: number[];
  new_deaths: number[];
  new_recovered: number[];
}

export interface DetailLinechart02_model{
  date: string[];
  death_rate: number[];
  recovere_rate: number[];
}

export interface DetailBarchart01_model{
  labels: string[],
  new_cases: number[]
}

export interface DetailBarchart02_model{
  labels: string[],
  new_deaths: number[]
}

export interface DetailBarchart03_model{
  labels: string[],
  new_recovered: number[]
}

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(private http: HttpClient) { }

  api1_detail : string = "https://api.corona.ngothithanhtruc.com/api1/detail?country=";
  getDetailInfo_data(country): Observable<DetailInfo_model>{
    return this.http.get<DetailInfo_model>(this.api1_detail + country);
  }

  api4_detail : string = "https://api.corona.ngothithanhtruc.com/api4/detail?country=";
  getDetailLinechart00_data(country): Observable<DetailLinechart00_model>{
    return this.http.get<DetailLinechart00_model>(this.api4_detail + country);
  }

  api11_detail : string = "https://api.corona.ngothithanhtruc.com/api11/detail?country=";
  getDetailLinechart01_data(country): Observable<DetailLinechart01_model>{
    return this.http.get<DetailLinechart01_model>(this.api11_detail + country);
  }

  api10_detail : string = "https://api.corona.ngothithanhtruc.com/api10/detail?country=";
  getDetailLinechart02_data(country): Observable<DetailLinechart02_model>{
    return this.http.get<DetailLinechart02_model>(this.api10_detail + country);
  }

  api7_detail : string = "https://api.corona.ngothithanhtruc.com/api7/detail?country=";
  getDetailBarchart01_data(country): Observable<DetailBarchart01_model>{
    return this.http.get<DetailBarchart01_model>(this.api7_detail + country);
  }

  api8_detail : string = "https://api.corona.ngothithanhtruc.com/api8/detail?country=";
  getDetailBarchart02_data(country): Observable<DetailBarchart02_model>{
    return this.http.get<DetailBarchart02_model>(this.api8_detail + country);
  }

  api9_detail : string = "https://api.corona.ngothithanhtruc.com/api9/detail?country=";
  getDetailBarchart03_data(country): Observable<DetailBarchart03_model>{
    return this.http.get<DetailBarchart03_model>(this.api9_detail + country);
  }
}
