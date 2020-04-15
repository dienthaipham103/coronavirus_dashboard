import { Component, OnInit } from '@angular/core';
import { Info, SidebarService } from 'src/app/services/sidebar.service';
import { LanguageService } from 'src/app/services/language.service';

// number with comma
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  cases;
  deaths;
  recovered;
  death_rate;
  recovered_rate;

  constructor(private sidebarService: SidebarService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
      // get datas from server
      this.sidebarService.getInfo().subscribe(data=>{
        this.cases = numberWithCommas(data.cases);
        this.deaths = numberWithCommas(data.deaths);
        this.recovered = numberWithCommas(data.recovered);
        this.death_rate = (data.death_rate*100).toFixed(2);;
        this.recovered_rate = (data.recovered_rate*100).toFixed(2);
      })
  }

}
