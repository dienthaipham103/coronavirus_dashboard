import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartsService, Linechart00_model } from 'src/app/services/charts.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-linechart00',
  templateUrl: './linechart00.component.html',
  styleUrls: ['./linechart00.component.scss']
})
export class Linechart00Component implements OnInit {
  chart = [];
  data;

  constructor(private chartsService: ChartsService,
              public languageService: LanguageService) { }

  ngOnInit(): void {
    this.chartsService.getLineChart00_data().subscribe(data=>{
      this.data = data;
      this.data['date'] = data['date'].map(x => new Date(x));

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels:  this.data['date'],
          datasets: [
            {
              data: this.data['cases'],
              borderColor: 'gray',
              label: this.languageService.show('case'),
              fill: false
            },
            {
              data: this.data['recovered'],
              borderColor: 'green',
              label: this.languageService.show('recovered'),
              fill: false
            },
            {
              data: this.data['deaths'],
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
            text: this.languageService.show('linechart00_title')
          }
        }
  
      })
    })

  }

}
