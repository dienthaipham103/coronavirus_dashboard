import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DefaultComponent } from './default/default.component';
import { MapComponent } from './pages/map/map.component';
import { ChartsComponent } from './pages/charts/charts.component';
import { StatisticComponent } from './pages/statistic/statistic.component';

import { MarkersService } from './pages/map/services/markers.service';
import { PopUpService } from './pages/map/services/pop-up.service';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StatisticService } from '../services/statistic.service';
import { ChartsService } from '../services/charts.service';
import { Linechart00Component } from './pages/charts/linechart00/linechart00.component';
import { PiechartComponent } from './pages/charts/piechart/piechart.component';
import { Barchart00Component } from './pages/charts/barchart00/barchart00.component';
import { Barchart01Component } from './pages/charts/barchart01/barchart01.component';
import { Barchart02Component } from './pages/charts/barchart02/barchart02.component';
import { Barchart03Component } from './pages/charts/barchart03/barchart03.component';
import { Linechart01Component } from './pages/charts/linechart01/linechart01.component';
import { Linechart02Component } from './pages/charts/linechart02/linechart02.component';
import { DetailComponent } from './pages/detail/detail.component';
import { DetailService } from '../services/detail.service';
import { DetailLinechart00Component } from './pages/detail/detail-linechart00/detail-linechart00.component';
import { DetailLinechart01Component } from './pages/detail/detail-linechart01/detail-linechart01.component';
import { DetailLinechart02Component } from './pages/detail/detail-linechart02/detail-linechart02.component';
import { DetailBarchart01Component } from './pages/detail/detail-barchart01/detail-barchart01.component';
import { DetailBarchart02Component } from './pages/detail/detail-barchart02/detail-barchart02.component';
import { DetailBarchart03Component } from './pages/detail/detail-barchart03/detail-barchart03.component';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import {MatTableModule} from '@angular/material/table';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';


@NgModule({
  declarations: [
    DefaultComponent,
    MapComponent,
    ChartsComponent,
    StatisticComponent,
    Linechart00Component,
    PiechartComponent,
    Barchart00Component,
    Barchart01Component,
    Barchart02Component,
    Barchart03Component,
    Linechart01Component,
    Linechart02Component,
    DetailComponent,
    DetailLinechart00Component,
    DetailLinechart01Component,
    DetailLinechart02Component,
    DetailBarchart01Component,
    DetailBarchart02Component,
    DetailBarchart03Component
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule,
    HttpClientModule,
    MDBBootstrapModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
    // MatTableDataSource,
    // MatPaginator,
    // MatTableModule,
    // MatPaginatorModule
  ],
  providers: [
    MarkersService,
    PopUpService,
    StatisticService,
    ChartsService,
    DetailService
  ]
})
export class LayersModule { }
