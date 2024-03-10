import { catchError, finalize, of } from "rxjs";
import { ModelDataSource } from "src/datasources/model.datasource";
import { Article } from "src/models/Article";
import { IArticleService } from "../article/article.service";
import { SearchResult } from "src/models/SearchResult";

export class ArticleDataSource extends ModelDataSource<Article> {
  override search(sortField: string = 'Number', direction: number = 0, pageIndex: number = 0, pageSize: number = 20, filter: string = ''): void {
    
    this.loadingSubject.next(true);

    this.articleService.search(sortField, direction, pageIndex, pageSize, filter).pipe(
      catchError(() => {
        return of(new SearchResult<Article>)
      }),
      finalize(() => {
        this.loadingSubject.next(false);
      })
    )
    .subscribe(result => {
      this.searchSubject.next(result);
      this.modelsSubject.next(result.records);
    });
  }

  constructor(private articleService: IArticleService) {
    super();
  }
}