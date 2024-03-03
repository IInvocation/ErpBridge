import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let WeatherComponent = class WeatherComponent {
    constructor(http, weatherService) {
        this.http = http;
        this.weatherService = weatherService;
        this.forecasts = [];
    }
    ngOnInit() {
        this.weatherService.getAll().subscribe({
            next: (v) => this.forecasts = v,
            error: (e) => console.error(e)
        });
    }
};
WeatherComponent = __decorate([
    Component({
        selector: 'app-weather',
        templateUrl: './weather.component.html',
        styleUrl: './weather.component.scss'
    }),
    __param(1, Inject('IWeatherService'))
], WeatherComponent);
export { WeatherComponent };
//# sourceMappingURL=weather.component.js.map