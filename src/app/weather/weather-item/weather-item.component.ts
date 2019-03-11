import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Weather } from '../Weather';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss']
})
export class WeatherItemComponent {
  @Input() weather: Weather;
  @Input() units: string;
  @Output() deleteEvent = new EventEmitter<string>();
  constructor() {}

  callDashboard(cityName: string) {
    this.deleteEvent.next(cityName);
  }
}
