import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Barchart00_model, ChartsService } from 'src/app/services/charts.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-barchart00',
  templateUrl: './barchart00.component.html',
  styleUrls: ['./barchart00.component.scss']
})
export class Barchart00Component implements OnInit {
  chart = [];
  data: Barchart00_model

  constructor(private chartsService: ChartsService, 
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.chartsService.getBarChart00_data().subscribe(data=>{
      this.data = data;

        // Bar chart
    this.chart = new Chart('canvas2', {
      type: 'bar',
      data: {
      labels: this.data['label'],
      datasets: [
        {
        label: "Population (millions)",
        backgroundColor:  ["#F7EA7E", "#F6DDFB","#CBF56C","#DDFBFA","#E6D7EC",
        "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9", "#c45850",
        "#EAD576", "#F2B8DD", "#CBC0C7", "#D5F08E", "#FCC36B", 
        "#BBEBDB", "#F58954", "#EDEF74", "#C8EF74", "#97C172",
        "#A0F1DE", "#A6D2D9", "#BDD7EA", "#D3CAEB", "#F0B7E8",
        "#EEECED", "#EFAC14", "#B2BA0A", "#337CAC", "#C3F1DD"],
        data: this.data['cases']
        }
      ]
      },
      options: {
        legend: { display: false },
        title: {
        display: true,
        text: this.languageService.show('barchart00_title')
        },
        scales: {
          yAxes: [{
            gridLines: {
              display: true
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.languageService.show('case')
            },
            
            ticks: {
              beginAtZero:true,
              userCallback: function(value, index, values) {
                  value = value.toString();
                  value = value.split(/(?=(?:...)*$)/);
                  value = value.join(',');
                  return value;
              }
            }
          }],
          xAxes: [{
            gridLines:{
              display: false
            }
          }]
        },

        tooltips: {
          callbacks: {
                label: function(tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    if(parseInt(value) >= 1000){
                               return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " people";
                            } else {
                               return value + " people";
                            }
                }
          } // end callbacks:
        }, //end tooltips  

      }
    });

    })
  
  }

}
