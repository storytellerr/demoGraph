import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as chartsp from 'fusioncharts/fusioncharts.timeseries';
import * as Zoomline from 'fusioncharts/fusioncharts.zoomline';
import * as zoomscatter from 'fusioncharts/fusioncharts.zoomscatter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NewComponent} from './new/new.component';
import {ScatterComponent} from './scatter/scatter.component';

FusionChartsModule.fcRoot(FusionCharts, charts, zoomscatter, Zoomline, FusionTheme, chartsp);
@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    ScatterComponent
  ],
  imports: [
    BrowserModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    AppRoutingModule,
    FusionChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
