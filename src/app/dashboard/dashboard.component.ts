import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../weather/Weather';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessage: string = null;
  cityName: string;
  weatherData: Weather[] = [];
  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // On init lets get all the users locations
    const userCities = JSON.parse(localStorage.getItem('token')).cities;
    userCities.forEach(city => {
      this.weatherService.getWeatherByCity(city).subscribe(
        data => {
          // Add the data to the current weather displayed
          this.weatherData.push(
            new Weather(
              data.name,
              data.weather[0].icon,
              data.main.temp,
              data.main.temp_max,
              data.main.temp_min
            )
          );
        },
        error => (this.errorMessage = this.errorMessage = error.error.message)
      );
    });
  }

  onSubmit(): void {
    this.weatherService.getWeatherByCity(this.cityName).subscribe(
      data => {
        // If the response is successful lets add this to the city weather and to local storage for the user
        const userData = JSON.parse(localStorage.getItem('token'));
        userData.cities.push(this.cityName);
        localStorage.setItem('token', JSON.stringify(userData));
        // Add the data to the current weather displayed
        this.weatherData.push(
          new Weather(
            data.name,
            data.weather[0].icon,
            data.main.temp,
            data.main.temp_max,
            data.main.temp_min
          )
        );
      },
      error => (this.errorMessage = this.errorMessage = error.error.message)
    );
  }
}
