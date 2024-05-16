import { __decorate, __param } from "tslib";
import { Component, ViewChild, Inject } from '@angular/core';
import { Article } from 'src/models/Article';
let EditArticleComponent = class EditArticleComponent {
    constructor(activatedRoute, articleService, _snackBar, router) {
        this.activatedRoute = activatedRoute;
        this.articleService = articleService;
        this._snackBar = _snackBar;
        this.router = router;
        this.model = new Article();
        this.isSubmitted = false;
    }
    ngOnInit() {
        this.articleNumber = this.activatedRoute.snapshot.url[1].path;
        ;
        this.getArticleByNumber();
    }
    getArticleByNumber() {
        this.articleService.get(this.articleNumber).subscribe(res => {
            this.model.number = res.number;
            this.model.name = res.name;
            this.model.description = res.description;
            this.model.stockLocation = res.stockLocation;
            this.model.listPrice = res.listPrice;
            this.model.priceGroup = res.priceGroup;
            this.model.stockAmount = res.stockAmount;
        });
    }
    EditArticle(isValid) {
        if (isValid) {
            this.isSubmitted = true;
            this.articleService.update(this.model).subscribe(res => {
                console.log(res);
                this._snackBar.open('Änderungen gespeichert', 'OK')
                    .onAction()
                    .subscribe(() => this.router.navigateByUrl('/article'));
            });
        }
    }
};
__decorate([
    ViewChild("articleForm")
], EditArticleComponent.prototype, "articleorm", void 0);
EditArticleComponent = __decorate([
    Component({
        selector: 'app-edit-article',
        templateUrl: './edit-article.component.html',
        styleUrl: './edit-article.component.scss'
    }),
    __param(1, Inject('IArticleService'))
], EditArticleComponent);
export { EditArticleComponent };
//# sourceMappingURL=edit-article.component.js.map