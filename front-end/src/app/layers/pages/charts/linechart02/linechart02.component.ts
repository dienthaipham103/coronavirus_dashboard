import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService } from 'src/app/services/charts.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-linechart02',
  templateUrl: './linechart02.component.html',
  styleUrls: ['./linechart02.component.scss']
})
export class Linechart02Component implements OnInit {
  chart = [];
  data;

  constructor(private chartsService: ChartsService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.chartsService.getLineChart02_data().subscribe(data=>{
      this.data = data
      this.data['labels'] = data['labels'].map(x => new Date(x));

      this.chart = new Chart('canvas7', {
        type: 'line',
        data: {
          labels:  this.data['labels'],
          datasets: [
            {
              data: this.data['new_cases'],
              borderColor: 'gray',
              label: this.languageService.show('case'),
              fill: false
            },
            {
              data: this.data['new_recovered'],
              borderColor: 'green',
              label: this.languageService.show('recovered'),
              fill: false
            },
            {
              data: this.data['new_deaths'],
              borderColor: 'red',
              label: this.languageService.show('death'),
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
                labelString: this.languageService.show('linechart00_ylabel')
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
            text: this.languageService.show('linechart02_title')
          }
        }
  
      })
    })
  }

}
