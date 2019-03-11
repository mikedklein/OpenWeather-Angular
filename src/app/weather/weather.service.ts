import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCities(): string[] {
    const cities: [string] = JSON.parse(localStorage.getItem('token')).cities;

    return cities;
  }

  getWeatherByCity(cityName: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        '?q=' +
        cityName +
        '&appid=' +
        environment.appId +
        '&units=' +
        JSON.parse(localStorage.getItem('token')).units
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
        JSON.parse(localStorage.getItem('token')).units
    );
  }
}
