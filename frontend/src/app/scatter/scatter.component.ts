import { Component, NgZone, ViewChild, ElementRef, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {interval} from 'rxjs';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  dataSource;
  dataSourceOne: any;
  type: string;
  width: string;
  height: string;
  fusion;
  chart;
  counter = 0;
  dataformat = 'json';
  @ViewChild('graph') someInput: ElementRef;
  constructor(private http: HttpClient) {
    this.type = 'zoomscatter';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSourceOne = {
      chart: {
        caption: 'Demo Graph',
        subcaption: 'Demo',
        yaxisname: 'Value in y Axis',
        xaxisname: 'Value',
        anchorBgColor: '#FF0000',
        showzeroplane: '0',
        anchorradius: '2',
        theme: 'fusion',
        plotTooltext: `<div id='valueDiv'><b>$seriesName</b>, x axis value: <b>$xDataValue</b>, y axis value: <b>$yDataValue</b></div>`
      },
      dataset: [
      {
        seriesname: 'A',
        anchorBgColor: '#addef7',
        anchorBordercolor: '#17a1e8',
        anchorBorderThickness: '1',
        data: [
          {
           y: 7.67,
           x: 29.85
         }, {
           y: 9.89,
           x: 29.04
         }, {
           y: 5.64,
           x: 29.88
         }, {
           y: 0.11,
           x: 29.4
         }, {
           y: 3.67,
           x: 22.94
         }, {
           y: 4.06,
           x: 20.52
         }, {
           y: 2.28,
           x: 37.78
         }, {
           y: 0.63,
           x: 30.68
         }, {
           y: 3.15,
           x: 24.89
         }, {
           y: 4.44,
           x: 35.65
         }, {
           y: 2.84,
           x: 29.96
         }, {
           y: 1.48,
           x: 38.5
         }, {
           y: 1.35,
           x: 20.72
         }, {
           y: 4.59,
           x: 25.56
         }, {
           y: 3.82,
           x: 24.88
         }, {
           y: 3.17,
           x: 30.16
         }, {
           y: 0.66,
           x: 28.51
         }, {
           y: 1.97,
           x: 23.14
         }, {
           y: 4.72,
           x: 23.58
         }, {
           y: 2.43,
           x: 21.28
         }, {
           y: 4.72,
           x: 39.2
         }, {
           y: 2.95,
           x: 22.36
         }, {
           y: 4.94,
           x: 30.32
         }, {
           y: 16.26,
           x: 54.4
         }, {
           y: 16.45,
           x: 53.58
         }, {
           y: 19.22,
           x: 57.06
         }, {
           y: 17.62,
           x: 58.95
         }, {
           y: 16.98,
           x: 46.33
         }, {
           y: 19.05,
           x: 40.03
         }, {
           y: 16.84,
           x: 43.06
         }, {
           y: 19.29,
           x: 52.02
         }, {
           y: 18.37,
           x: 55.36
         }, {
           y: 15.49,
           x: 43.6
         }, {
           y: 18.14,
           x: 55.07
         }, {
           y: 18.82,
           x: 41.81
         }, {
           y: 19.63,
           x: 51.44
         }, {
           y: 15.48,
           x: 44.99
         }, {
           y: 19.36,
           x: 40.54
         }, {
           y: 19.95,
           x: 55.44
         }, {
           y: 17.36,
           x: 46.14
         }, {
           y: 17.97,
           x: 56.57
         }, {
           y: 16.68,
           x: 44.38
         }, {
           y: 17.14,
           x: 48.7
         }, {
           y: 16.29,
           x: 52.58
         }, {
           y: 17.61,
           x: 40.02
         }, {
           y: 15.23,
           x: 47.43
         }, {
           y: 16.3,
           x: 53.05
         }, {
           y: 15.24,
           x: 47.56
         }, {
           y: 18.12,
           x: 49.14
         }, {
           y: 15.08,
           x: 45.45
         }]
      },
      {
        seriesname: 'B',
        anchorBgColor: '#f68c6b',
        anchorBordercolor: '#f0440f',
        anchorBorderThickness: '1',
        data: [{
          y: 11.56,
          x: 9.45
        }, {
          y: 14.83,
          x: 11.78
        }, {
          y: 11.7,
          x: 5.22
        }, {
          y: 12.97,
          x: 1.72
        }, {
          y: 13.67,
          x: 14.07
        }, {
          y: 12.24,
          x: 10.75
        }, {
          y: 14.94,
          x: 5.68
        }, {
          y: 12.19,
          x: 11.34
        }, {
          y: 14.47,
          x: 19.04
        }, {
          y: 10.9,
          x: 1.88
        }, {
          y: 17.57,
          x: 34.32
        }, {
          y: 15.89,
          x: 35.72
        }, {
          y: 18.7,
          x: 27.66
        }, {
          y: 17.4,
          x: 36.66
        }, {
          y: 15.17,
          x: 25.06
        }, {
          y: 18.91,
          x: 36.79
        }, {
          y: 16.8,
          x: 39.51
        }, {
          y: 18.72,
          x: 28.96
        }, {
          y: 18.92,
          x: 29.21
        }, {
          y: 17.2,
          x: 31.18
        }, {
          y: 15.64,
          x: 32.95
        }, {
          y: 19.38,
          x: 29.29
        }, {
          y: 16.69,
          x: 38.33
        }, {
          y: 19.83,
          x: 37.16
        }, {
          y: 19.13,
          x: 38.3
        }, {
          y: 15.55,
          x: 32.3
        }, {
          y: 18.57,
          x: 20.39
        }, {
          y: 18.04,
          x: 38.48
        }, {
          y: 19.57,
          x: 37.58
        }, {
          y: 15.01,
          x: 30.3
        }, {
          y: 11.15,
          x: 31.46
        }, {
          y: 11.84,
          x: 22.42
        }, {
          y: 11.58,
          x: 23
        }, {
          y: 12.25,
          x: 37.93
        }, {
          y: 11.41,
          x: 22.98
        }, {
          y: 12.88,
          x: 25.44
        }, {
          y: 11.94,
          x: 29.13
        }, {
          y: 11.33,
          x: 29.67
        }, {
          y: 11.89,
          x: 23.75
        }, {
          y: 14.09,
          x: 23.68
        }, {
          y: 10.68,
          x: 22.71
        }, {
          y: 13.22,
          x: 23.14
        }, {
          y: 13.84,
          x: 24.73
        }, {
          y: 13.47,
          x: 21.97
        }, {
          y: 11.55,
          x: 39.86
        }, {
          y: 14.62,
          x: 28.4
        }, {
          y: 11.55,
          x: 39.16
        }, {
          y: 11.37,
          x: 32.44
        }, {
          y: 11.49,
          x: 23.16
        }, {
          y: 14.48,
          x: 32.96
        }
        ]
      }
      ]
    };
    this.dataSource = JSON.parse(JSON.stringify(this.dataSourceOne));
}
  ngOnInit(): void {
    const interOne = interval(1000).subscribe(() => {
      // this.toTrunc(this.getRandom(0, 20), 2)

      this.dataSourceOne.dataset[0].data.push({x: this.toTrunc(this.getRandom(0, 80), 2), y: this.toTrunc(this.getRandom(0, 20), 2)});
      this.dataSourceOne.dataset[1].data.push({x: this.toTrunc(this.getRandom(0, 80), 2), y: this.toTrunc(this.getRandom(0, 20), 2)});

    });
    const interValTwo = interval(10000).subscribe(() => {
      console.log('a');
      this.dataSource = JSON.parse(JSON.stringify(this.dataSourceOne));
      this.chart.setJSONData(this.dataSource);
    });
  }

  getRandom(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
  toTrunc(value, n) {
    let x = (value.toString() + '.0').split('.');
    return parseFloat(x[0] + '.' + x[1].substr(0, n));
}


  initialized($event) {
    console.log('fdsf');
    this.chart = $event.chart; // saving chart instance
    console.log(this.chart);
}



}
