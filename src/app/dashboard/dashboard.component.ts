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
  units = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    // On init lets get all the users locations
    const userData = JSON.parse(localStorage.getItem('token'));
    const userCities = userData.cities;
    this.refetchData(userCities);
    // Set the units
    this.units = userData.units;
  }

  refetchData(userCities: string[]) {
    // Clear any possible previous weather data
    this.weatherData = [];
    // Populate all the city day
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

  changeUnits() {
    if (this.units === 'imperial') {
      this.units = 'metric';
    } else {
      this.units = 'imperial';
    }
    // Update the user data
    const userData = JSON.parse(localStorage.getItem('token'));
    userData.units = this.units;
    localStorage.setItem('token', JSON.stringify(userData));
    // Update the data
    this.refetchData(userData.cities);
  }

  deleteCity(cityName: string): void {
    const proceed = confirm(
      `Are you sure you want to delete ${cityName} from your list`
    );
    if (proceed) {
      // Placeholder for reconstructing the list in the user's prefs
      const newUserCities: string[] = [];
      const newWeatherData: Weather[] = [];
      // Using for each because multiple operations are happening so
      // it would be misleading to use filter
      this.weatherData.forEach(weather => {
        if (weather.city.toLowerCase() !== cityName.toLowerCase()) {
          newUserCities.push(weather.city);
          newWeatherData.push(weather);
        }
      });

      // rewrite the user data
      // TODO: might be smart to move this to a service at this point
      const userData = JSON.parse(localStorage.getItem('token'));
      userData.cities = newUserCities;
      localStorage.setItem('token', JSON.stringify(userData));
      this.weatherData = newWeatherData;
    }
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
        this.cityName = '';
      },
      error => (this.errorMessage = this.errorMessage = error.error.message)
    );
  }
}
