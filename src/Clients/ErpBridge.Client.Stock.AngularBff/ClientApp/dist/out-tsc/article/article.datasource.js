import { catchError, finalize, of } from "rxjs";
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from "src/models/SearchResult";
export class ArticleDataSource extends ModelDataSource {
    search(sortField = 'Number', direction = 0, pageIndex = 0, pageSize = 20, filter = '') {
        this.loadingSubject.next(true);
        this.articleService.search(sortField, direction, pageIndex, pageSize, filter).pipe(catchError(() => {
            return of(new SearchResult);
        }), finalize(() => {
            this.loadingSubject.next(false);
        }))
            .subscribe(result => {
            this.searchSubject.next(result);
            this.modelsSubject.next(result.records);
        });
    }
    constructor(articleService) {
        super();
        this.articleService = articleService;
    }
}
//# sourceMappingURL=article.datasource.js.map