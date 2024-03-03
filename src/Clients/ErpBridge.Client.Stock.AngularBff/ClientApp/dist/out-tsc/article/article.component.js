import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let ArticleComponent = class ArticleComponent {
    constructor(http, articleService) {
        this.http = http;
        this.articleService = articleService;
        this.articles = [];
        this.displayedColumns = ['number', 'name', 'description'];
    }
    ngOnInit() {
        this.articleService.getAll().subscribe({
            next: (v) => this.articles = v,
            error: (e) => console.error(e)
        });
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