import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { ArticleDataSource } from './article.datasource';
import { RestDataService } from 'src/dataServices/RestDataService';
let ArticleService = class ArticleService extends RestDataService {
    constructor(httpClient) {
        super(httpClient);
        this.basePath = "/api/Article/";
    }
    getDataSource() {
        return new ArticleDataSource(this);
    }
};
ArticleService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ArticleService);
export { ArticleService };
//# sourceMappingURL=article.service.js.map