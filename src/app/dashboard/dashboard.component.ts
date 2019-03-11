import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../weather/Weather';
import { AuthService } from '../auth.service';
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

  constructor(
    private weatherService: WeatherService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // On init lets get all the users locations
    const userData = this.authService.getUserData();
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

  changeUnits(): void {
    let newUnits: string;
    if (this.units === 'imperial') {
      newUnits = 'metric';
    } else {
      newUnits = 'imperial';
    }
    // Update the user data
    const userData = this.authService.getUserData();
    userData.units = newUnits;
    this.authService.setUserData(userData);
    // Update the data
    this.refetchData(userData.cities);
    this.units = newUnits;
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
      const userData = this.authService.getUserData();
      userData.cities = newUserCities;
      this.authService.setUserData(userData);
      this.weatherData = newWeatherData;
    }
  }

  onSubmit(): void {
    this.weatherService.getWeatherByCity(this.cityName).subscribe(
      data => {
        // If the response is successful lets add this to the city weather and to local storage for the user
        const userData = this.authService.getUserData();
        userData.cities.push(this.cityName);
        this.authService.setUserData(userData);
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
