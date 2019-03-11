import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCities(): string[] {
    const cities: [string] = this.authService.getUserData().cities;

    return cities;
  }

  getWeatherByCity(cityName: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        'weather?q=' +
        cityName +
        '&appid=' +
        environment.appId +
        '&units=' +
        this.authService.getUserData().units
    );
  }

  getDetailForecastByCity(cityName: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        'forecast?q=' +
        cityName +
        '&appid=' +
        environment.appId +
        '&units=' +
        this.authService.getUserData().units
    );
  }
}
