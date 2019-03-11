import { Component, Input } from '@angular/core';
import { Weather } from '../Weather';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent {
  @Input() weather: Weather;
  constructor() {}
}
