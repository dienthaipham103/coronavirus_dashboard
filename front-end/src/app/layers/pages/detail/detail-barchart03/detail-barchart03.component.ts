import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DetailService } from 'src/app/services/detail.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-detail-barchart03',
  templateUrl: './detail-barchart03.component.html',
  styleUrls: ['./detail-barchart03.component.scss']
})
export class DetailBarchart03Component implements OnInit {
  @Input()
  country: string;
  
  chart = [];
  data;

  constructor(private detailService: DetailService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.detailService.getDetailBarchart03_data(this.country).subscribe(data=>{
      this.data = data
      this.data['labels'] = data['labels'].map(x => new Date(x));
      let count = this.data['labels'].length;

             // Bar chart
    this.chart = new Chart('canvas_4', {
      type: 'bar',
      data: {
      labels: this.data['labels'],
      datasets: [
        {
        label: "Population (millions)",
        backgroundColor: Array(count).fill('#B9ADC2'),
        data: this.data['new_recovered']
        }
      ]
      },
      options: {
        legend: { display: false },
        title: {
        display: true,
        text: this.languageService.show('barchart03_title')
        },
        scales: {
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: this.languageService.show('recovered')
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
          xAxes:[{
            offset: true,
            gridLines:{
              display: false
            },
            type: 'time',
            time: {
              tooltipFormat: 'll',
              parser: 'D/M/YY',
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                'day': 'D/M/YY'
              }
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
