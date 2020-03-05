import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {dataa } from './gdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataSource: any;
  type: string;
  width: string;
  height: string;
  fusion;
  chart;
  // graphTypes = [
  //   {value: 'steak-0', viewValue: 'Steak'},
  //   {value: 'pizza-1', viewValue: 'Pizza'},
  //   {value: 'tacos-2', viewValue: 'Tacos'}
  // ];
  @ViewChild('graph') someInput: ElementRef;
  constructor(private http: HttpClient) {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      data: null,
      chart: {
        timeSpread: {
          unit: 'day',
          multiplier: 4
        },
        multiCanvas: false,
        showLegend: 1,
      },
      caption: {
        text: 'Flow Rate vs Time'
      },
      series: 'Type',
      yAxis: [
        {
          plot: [
            {
            value: 'Daily Visitors',
            type: 'Line',
            connectnulldata: true,
            style: {
              'plot.null': {
              'stroke-dasharray': 'none',
                stroke: '#FF0000'
              }
            }
          }
          ],
          title: 'dssasad'
        }
      ],
      xaxis: {
        initialInterval: {
            from: "26/02/20 15:00:00",
            to: "26/02/20 23:59:59"
        }
    }
    };
    this.fetchData();
  }

  // In this method we will create our DataStore and using that we will create a custom DataTable which takes two
  // parameters, one is data another is schema.
  fetchData() {
    this.http.get(`http://localhost:9999/rest/spectrum/graph/813/0`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((val: any) => {
      console.log('done');
      const data =  val;
      const schema = [    {
        'name': 'Time',
        'type': 'date',
        'format': '%d/%m/%y %H:%M:%S'
    }, {
        'name': 'Type',
        'type': 'string'
        },
        {
        'name': 'Flow Rate(mL/min)',
        'type': 'number'
        }];
      // console.log(res[1]);
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      console.log(fusionDataStore);
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      console.log(this.dataSource);
      this.dataSource.data = fusionTable;
    });
  }

  initialized($event) {
    this.chart = $event.chart; // saving chart instance

    this.http.get(`http://localhost:9999/rest/spectrum/graph/hist/813`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe((val: any) => {
      let i = 0;
      const time = new Date(1582711218000);
      const incrementor = setInterval(() => {
        if (this.chart !== undefined) {
          time.setSeconds(time.getSeconds() + 10);
          // console.log(typeof(time.toLocaleString()));
          const feed = val[i][23].toString();
          const perm = val[i][41].toString();
          const ret = val[i][5].toString();

          let formatedTime = time.toLocaleString();
          formatedTime = formatedTime.replace(",", "");
          formatedTime = formatedTime.replace("/2020", "/20");
          const a  = [formatedTime, 'Feed' , feed];
          console.log(a);
          this.chart.feedData([
            [formatedTime, 'Feed', feed],
            [formatedTime, 'Permeate', perm ],
            [formatedTime, 'Retentate', ret ]
          ]);
          i++;
          // console.log(this.chart);
        }
        // console.log(this.chart);

      }, 1000);
    });
}

}

