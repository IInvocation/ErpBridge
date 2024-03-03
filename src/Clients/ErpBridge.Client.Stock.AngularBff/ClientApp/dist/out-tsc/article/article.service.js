import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
let ArticleService = class ArticleService {
    getAll() {
        return this.httpClient.get('/api/Article/GetAll');
    }
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
};
ArticleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleService);
export { ArticleService };
let ArticleMockService = class ArticleMockService {
    getAll() {
        let articles = [
            {
                number: "103001",
                name: "GENO-EFK 50 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
            },
            {
                number: "103002",
                name: "GENO-EFK 80 µm",
                description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
            }
        ];
        return of(articles);
    }
};
ArticleMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleMockService);
export { ArticleMockService };
//# sourceMappingURL=article.service.js.map