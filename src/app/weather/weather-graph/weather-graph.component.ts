import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-weather-graph',
  templateUrl: './weather-graph.component.html',
  styleUrls: ['./weather-graph.component.scss']
})
export class WeatherGraphComponent implements OnInit {
  @Input() data;
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];

  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.5)'
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {}

  ngOnInit() {
    const lowSeries = {
      data: [],
      label: 'Low Temps'
    };

    const highSeries = {
      data: [],
      label: 'High Temps'
    };
    this.data.forEach(day => {
      this.lineChartLabels.push(day.dayTxt);
      lowSeries.data.push(day.lowTemp);
      highSeries.data.push(day.highTemp);
    });
    this.lineChartData.push(lowSeries);
    this.lineChartData.push(highSeries);
  }
}
