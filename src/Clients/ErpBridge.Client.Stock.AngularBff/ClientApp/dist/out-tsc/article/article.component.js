import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let ArticleComponent = class ArticleComponent {
    constructor(http, articleService) {
        this.http = http;
        this.articleService = articleService;
        this.articlesSource = null;
        this.displayedColumns = ['number', 'name', 'description'];
    }
    ngOnInit() {
        this.articlesSource = this.articleService.getDataSource();
        this.articlesSource.search('number', 0, 0, 20, '');
    }
};
ArticleComponent = __decorate([
    Component({
        selector: 'app-article',
        templateUrl: './article.component.html',
        styleUrl: './article.component.scss'
    }),
    __param(1, Inject('IArticleService'))
], ArticleComponent);
export { ArticleComponent };
//# sourceMappingURL=article.component.js.map