import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dataa } from './gdata';

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
          unit: 'year',
          multiplier: 1
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
    const jsonify = res => res.json();
    const dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
    ).then(jsonify);
    const schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/area-chart-with-time-axis-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }

  initialized($event) {
    this.chart = $event.chart; // saving chart instance

    // this.http.get(`http://localhost:9999/rest/spectrum/graph/hist/813`, {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //   })
    // }).subscribe((val: any) => {
    
    // });
  }

  buttonClick() {
    let i = 0;
    const time = new Date('2018-11-12');
    const incrementor = setInterval(() => {
      if (this.chart !== undefined) {
        time.setDate(time.getDate() + 1);
        // console.log(typeof(time.toLocaleString()));
        let val: any = Math.floor(Math.random() * 100) + 20;
        if (val > 30 && val < 70) {
          val = 'N/A';
        }
        let formatedTime = time.toISOString();
        formatedTime = formatedTime.split('T')[0];
        // formatedTime = formatedTime.replace("", "");
        // formatedTime = formatedTime.replace("/2020", "/20");
        const a = [formatedTime, val];
        console.log(a);
        this.chart.feedData([
         [formatedTime, val]
        ]);
        i++;
        // console.log(this.chart);
      }
      // console.log(this.chart);

    }, 1000);
  }

}

