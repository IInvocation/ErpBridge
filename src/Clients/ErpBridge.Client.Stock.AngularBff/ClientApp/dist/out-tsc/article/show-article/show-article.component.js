import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let ShowArticleComponent = class ShowArticleComponent {
    constructor(activatedRoute, articleService) {
        this.activatedRoute = activatedRoute;
        this.articleService = articleService;
        var num = activatedRoute.snapshot.url[1].path;
        articleService.get(num).subscribe(res => this.article = res);
    }
};
ShowArticleComponent = __decorate([
    Component({
        selector: 'app-show-article',
        templateUrl: './show-article.component.html',
        styleUrl: './show-article.component.scss'
    }),
    __param(1, Inject('IArticleService'))
], ShowArticleComponent);
export { ShowArticleComponent };
//# sourceMappingURL=show-article.component.js.map