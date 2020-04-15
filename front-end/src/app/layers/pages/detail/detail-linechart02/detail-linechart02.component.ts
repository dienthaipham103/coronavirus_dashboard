import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DetailService } from 'src/app/services/detail.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-detail-linechart02',
  templateUrl: './detail-linechart02.component.html',
  styleUrls: ['./detail-linechart02.component.scss']
})
export class DetailLinechart02Component implements OnInit {
  @Input()
  country: string;
  
  chart = [];
  data;

  constructor(private detailService: DetailService, 
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.detailService.getDetailLinechart02_data(this.country).subscribe(data=>{
      this.data = data
      this.data['date'] = data['date'].map(x => new Date(x));

      this.chart = new Chart('canvas_5', {
        type: 'line',
        data: {
          labels:  this.data['date'],
          datasets: [
            {
              data: this.data['recovered_rate'],
              borderColor: 'green',
              label: this.languageService.show('recovered_rate'),
              fill: false
            },
            {
              data: this.data['death_rate'],
              borderColor: 'red',
              label: this.languageService.show('death_rate'),
              fill: false
            }
          ]
        },
        options: {
          tooltips: {
            mode: 'label',
            label: 'mylabel',
            callbacks: {
                label: function(tooltipItem, data) {
                    return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
          },
          legend: {
            display: true,
            // fullWidth: true,
            // labels: {
            //   fontSize: 11
            // },
            // position: 'left'
          },
  
          scales: {
            xAxes: [{
              gridLines:{
                display: false
              },
              display: true,
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
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: this.languageService.show('linechart01_ylabel')
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
            }]
          },
  
          title: {
            display: true,
            text: this.languageService.show('linechart01_title')
          }
        }
  
      })
    })
  }

}
