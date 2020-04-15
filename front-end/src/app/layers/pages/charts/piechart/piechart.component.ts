import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService, Piechart_model } from 'src/app/services/charts.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  chart = [];
  data: Piechart_model;

  constructor(private chartsService: ChartsService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.chartsService.getPieChart_data().subscribe(data=>{
      this.data = data;
      
      this.chart = new Chart('canvas1', {
        type: 'pie',
        data: {
          labels: this.data['label'],
          datasets: [{
            label: "Population (millions)",
            backgroundColor: ["#F7EA7E", "#F6DDFB","#CBF56C","#DDFBFA","#E6D7EC",
                              "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#c45850",
                              "#EAD576", "#F2B8DD", "#CBC0C7", "#D5F08E", "#FCC36B", 
                              "#BBEBDB", "#F58954", "#EDEF74", "#C8EF74", "#97C172",
                              "#A0F1DE", "#A6D2D9", "#BDD7EA", "#D3CAEB", "#F0B7E8",
                              "#EEECED", "#EFAC14", "#B2BA0A", "#337CAC", "#C3F1DD", "#8C8490"],
            data: this.data['cases']
          }]
        },
        options: {
          title: {
            display: true,
            text: this.languageService.show('piechart_title')
          },
          legend: {
            display: true,
            position:'top'
          }
        }
    });
    })

  }

}
