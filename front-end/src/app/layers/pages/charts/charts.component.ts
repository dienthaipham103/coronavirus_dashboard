import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  constructor(public languageService: LanguageService,
              private route: Router) { }

  ngOnInit(): void {
      // resize when we call /charts at the first time
      setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
      }, 300);

      this.languageService.change.subscribe(() => {
        console.log(123);
        if(this.languageService.opt == 1){
          this.route.navigate(['charts/en']);
        }
        else{
          this.route.navigate(['charts']);
        }
      })
  }

}
