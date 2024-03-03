import { Component, OnInit,  Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from 'src/models/WeatherForecast';
import { IWeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {
    public forecasts: WeatherForecast[] = [];

    constructor(private http: HttpClient, @Inject('IWeatherService') private weatherService: IWeatherService) {
    }

    ngOnInit() {
        this.weatherService.getAll().subscribe({
            next: (v) => this.forecasts = v,
            error: (e) => console.error(e)
        });
    }
}