import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
let WeatherService = class WeatherService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getAll() {
        return this.httpClient.get('/api/WeatherForecast');
    }
};
WeatherService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WeatherService);
export { WeatherService };
let WeatherMockService = class WeatherMockService {
    constructor() { }
    getAll() {
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
        ];
        return of(forecasts);
    }
};
WeatherMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], WeatherMockService);
export { WeatherMockService };
//# sourceMappingURL=weather.service.js.map