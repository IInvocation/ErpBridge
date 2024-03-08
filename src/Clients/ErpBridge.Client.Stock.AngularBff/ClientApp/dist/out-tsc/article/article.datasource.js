import { catchError, finalize, of } from "rxjs";
import { ModelDataSource } from "src/datasources/model.datasource";
export class ArticleDataSource extends ModelDataSource {
    search(sortField = 'Number', direction = 0, pageIndex = 0, pageSize = 20, filter = '') {
        this.loadingSubject.next(true);
        this.articleService.search(sortField, direction, pageIndex, pageSize, filter).pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe(models => this.modelsSubject.next(models));
    }
    constructor(articleService) {
        super();
        this.articleService = articleService;
    }
}
//# sourceMappingURL=article.datasource.js.map