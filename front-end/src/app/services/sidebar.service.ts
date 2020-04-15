import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Info{
  cases: number;
  death_rate: number;
  deaths: number;
  recovered_rate: number;
  recovered: number;
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  sideBarOpen = true;

  constructor(private http: HttpClient) { }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  // not, it's not in use
  offSideBar(){
    this.sideBarOpen = false;
  }

  api1_url : string = "https://api.corona.ngothithanhtruc.com/api1";
  getInfo(): Observable<Info>{
    return this.http.get<Info>(this.api1_url);
  }

}
