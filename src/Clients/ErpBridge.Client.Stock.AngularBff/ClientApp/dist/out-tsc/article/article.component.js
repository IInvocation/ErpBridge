import { __decorate, __param } from "tslib";
import { Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { MatSort } from '@angular/material/sort';
let ArticleComponent = class ArticleComponent {
    constructor(articleService) {
        this.articleService = articleService;
        this.articlesSource = null;
        this.displayedColumns = [
            'number',
            'name',
            //'description',
            'stockRow',
            'stockRack',
            'stockCase'
        ];
        this.paginator = null;
        this.sort = null;
        this.input = null;
    }
    ngOnInit() {
        this.articlesSource = this.articleService.getDataSource();
        this.articlesSource.search('number', 0, 0, 5, '');
    }
    ngAfterViewInit() {
        this.paginator.pageSize = 5;
        this.articlesSource.searchResult.subscribe(res => {
            this.paginator.length = res.recordCount;
        });
        fromEvent(this.input.nativeElement, 'keyup')
            .pipe(debounceTime(150), distinctUntilChanged(), tap(() => {
            this.paginator.pageIndex = 0;
            this.search();
        }))
            .subscribe();
        merge(this.sort.sortChange, this.paginator.page)
            .subscribe(() => {
            this.search();
        });
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    }
    search() {
        let direction = this.sort.direction == "asc" ? 0 : 1;
        this.articlesSource.search(this.sort.active, direction, this.paginator.pageIndex, this.paginator.pageSize, this.input.nativeElement.value);
    }
};
__decorate([
    ViewChild(MatPaginator)
], ArticleComponent.prototype, "paginator", void 0);
__decorate([
    ViewChild(MatSort)
], ArticleComponent.prototype, "sort", void 0);
__decorate([
    ViewChild('input')
], ArticleComponent.prototype, "input", void 0);
ArticleComponent = __decorate([
    Component({
        selector: 'app-article',
        templateUrl: './article.component.html',
        styleUrl: './article.component.scss'
    }),
    __param(0, Inject('IArticleService'))
], ArticleComponent);
export { ArticleComponent };
//# sourceMappingURL=article.component.js.map