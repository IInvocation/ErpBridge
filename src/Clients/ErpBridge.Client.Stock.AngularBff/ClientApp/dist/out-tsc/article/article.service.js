import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
import { ArticleDataSource } from './article.datasource';
let ArticleService = class ArticleService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getDataSource() {
        return new ArticleDataSource(this);
    }
    getAll() {
        var x = this.httpClient.get('/api/Article/GetAll');
        return x;
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
        throw new Error('Method not implemented.');
    }
};
ArticleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleService);
export { ArticleService };
let ArticleMockService = class ArticleMockService {
    getDataSource() {
        return new ArticleDataSource(this);
    }
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
            },
            {
                number: "189100",
                name: "Enthärtungsanlage Typ softliQ:SD18",
                description: "Enthärtungsanlage Typ softliQ:SD18\r\nNennkapazität: 18 m³"
            },
            {
                number: "189200",
                name: "Enthärtungsanlage Typ softliQ:SD21",
                description: "Enthärtungsanlage Typ softliQ:SD21\r\nNennkapazität: 21 m³"
            },
            {
                number: "189300",
                name: "Enthärtungsanlage Typ softliQ:SD23",
                description: "Enthärtungsanlage Typ softliQ:SD2\r\nNennkapazität: 23 m³"
            }
        ];
        return of(articles).pipe(delay(1000));
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
        throw new Error('Method not implemented.');
    }
};
ArticleMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleMockService);
export { ArticleMockService };
//# sourceMappingURL=article.service.js.map