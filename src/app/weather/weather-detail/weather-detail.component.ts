import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from '../weather.service';
import { WeatherDay } from '../WeatherDay';
const daysOfWeek: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styleUrls: ['./weather-detail.component.scss']
})
export class WeatherDetailComponent implements OnInit {
  name: string;
  daysOfWeather: WeatherDay[] = [];
  displayedColumns: string[] = ['dayTxt', 'highTemp', 'lowTemp', 'description'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.getCityForecast();
  }

  private formatData(data) {
    data.list.forEach(dataPoint => {
      const groupDay = new Date(dataPoint.dt_txt).getDay();
      // Check if the array contains the date
      const currentDay = this.daysOfWeather.filter(day => {
        return day.day === groupDay;
      });
      if (currentDay.length > 0) {
        this.daysOfWeather.map(weatherDay => {
          // Nested if fix later
          if (weatherDay.day === groupDay) {
            // check if new high
            if (weatherDay.highTemp < dataPoint.main.temp) {
              weatherDay.highTemp = dataPoint.main.temp;
              return weatherDay;
            } else if (weatherDay.lowTemp > dataPoint.main.temp) {
              // check if new low
              weatherDay.lowTemp = dataPoint.main.temp;
              return weatherDay;
            } else {
              // other wise just return the object
              return weatherDay;
            }
          } else {
            return weatherDay;
          }
        });
      } else {
        // If its not that means there isn't a high or low yet either
        // so defaulting to the included min
        this.daysOfWeather.push({
          day: groupDay,
          dayTxt: daysOfWeek[groupDay],
          highTemp: dataPoint.main.temp,
          lowTemp: dataPoint.main.temp_min,
          description: dataPoint.weather[0].icon
        });
      }
    });
  }

  getCityForecast() {
    const name = this.route.snapshot.paramMap.get('name');
    this.weatherService.getDetailForecastByCity(name).subscribe(data => {
      this.name = data.city.name;
      this.formatData(data);
    });
  }

  back() {
    this.router.navigate(['/dashboard']);
  }
}
