import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layers/default/default.component';
import { MapComponent } from './layers/pages/map/map.component';
import { ChartsComponent } from './layers/pages/charts/charts.component';
import { StatisticComponent } from './layers/pages/statistic/statistic.component';
import { DetailComponent } from './layers/pages/detail/detail.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [{
      path: '',
      component: MapComponent
    },
    {
      path: 'en',
      component: MapComponent
    },
    {
      path: 'charts',
      component: ChartsComponent
    },
    {
      path: 'charts/en',
      component: ChartsComponent
    },
    {
      path: 'statistic',
      component: StatisticComponent
    },
    {
      path: 'statistic/en',
      component: StatisticComponent
    },
    {
      path: 'detail/:country',
      component: DetailComponent
    },
    {
      path: 'detail/en/:country',
      component: DetailComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
