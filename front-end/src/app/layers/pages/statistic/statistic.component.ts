import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatisticDataSource, StatisticItem } from './statistic-datasource';
import { StatisticService } from 'src/app/services/statistic.service';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StatisticItem>;
  dataSource: StatisticDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rank', 'flag', 'country', 'cases', 'deaths', 'recovered', 'active', 'death_rate', 'recovered_rate', 'days'];

  constructor(private statisticService: StatisticService,
              private route: Router,
              public languageService: LanguageService) { }

  ngOnInit() {
    this.dataSource = new StatisticDataSource(this.statisticService);

    this.languageService.change.subscribe(() => {
      console.log(123);
      if(this.languageService.opt == 1){
        this.route.navigate(['statistic/en']);
      }
      else{
        this.route.navigate(['statistic']);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  detailRouter(opt){
    if(opt == 0){
      return '/detail'
    }
    return '/detail/en'
  }
}
