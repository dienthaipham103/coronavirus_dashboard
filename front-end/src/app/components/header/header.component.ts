import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();

    // resize
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  mapRouter(opt){
    if(opt == 0){
      return '/'
    }
    return '/en'
  }

  chartRouter(opt){
    if(opt == 0){
      return '/charts'
    }
    return '/charts/en'
  }

  statisticRouter(opt){
    if(opt == 0){
      return '/statistic'
    }
    return '/statistic/en'
  }

}
