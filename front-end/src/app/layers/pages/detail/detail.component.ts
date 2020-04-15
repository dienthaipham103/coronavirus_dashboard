import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService, DetailInfo_model } from 'src/app/services/detail.service';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

// number with comma
function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  country;
  flag;
  cases;
  deaths;
  death_rate;
  recovered;
  recovered_rate;

  constructor(private route: ActivatedRoute,
              private detailService: DetailService,
              private _route: Router,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.country = this.route.snapshot.paramMap.get('country');
    this.flag = 'assets/flags/' + this.country + '.png';

    this.detailService.getDetailInfo_data(this.country).subscribe(data=>{
      this.cases = numberWithCommas(data.cases);
      this.deaths = numberWithCommas(data.deaths);
      this.recovered = numberWithCommas(data.recovered);
      this.death_rate = numberWithCommas((data.death_rate*100).toFixed(2));
      this.recovered_rate = numberWithCommas((data.recovered_rate*100).toFixed(2));
    })

    this.languageService.change.subscribe(() => {
      console.log(123);
      if(this.languageService.opt == 1){
        this._route.navigate(['detail/en/' + this.country]);
      }
      else{
        this._route.navigate(['detail/' + this.country]);
      }
    })
  }

}
