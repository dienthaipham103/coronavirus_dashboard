import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  // sideBarOpen = true;

  constructor(public sidebarService: SidebarService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sidebarService.sideBarToggler();
  }

}
