import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherForecast } from 'src/models/WeatherForecast';
import { Observable, of } from 'rxjs';

export interface IWeatherService {
  getAll(): Observable<WeatherForecast[]>;
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements IWeatherService {
  constructor(private readonly httpClient: HttpClient) {}

    getAll(): Observable<WeatherForecast[]> {
        return this.httpClient.get<WeatherForecast[]>('/api/WeatherForecast');
  }
}

@Injectable({
  providedIn: 'root'
})
export class WeatherMockService implements IWeatherService {
  constructor() {}

    getAll(): Observable<WeatherForecast[]> {
        let forecasts = [
          {
            date: "2024-03-02",
            temperatureC: 34,
            temperatureF: 64,
            summary: "Hot"
          },
          {
            date: "2024-03-02",
            temperatureC: 14,
            temperatureF: 44,
            summary: "Cold"
          }
        ] as WeatherForecast[];
        return of(forecasts);
  }
}