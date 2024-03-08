import { CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, catchError, finalize, of } from "rxjs";
import { ModelDataSource } from "src/datasources/model.datasource";
import { Article } from "src/models/Article";
import { IArticleService } from "./article.service";

export class ArticleDataSource extends ModelDataSource<Article> {
  override search(sortField: string = 'Number', direction: number = 0, pageIndex: number = 0, pageSize: number = 20, filter: string = ''): void {
    this.loadingSubject.next(true);

    this.articleService.search(sortField, direction, pageIndex, pageSize, filter).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
    .subscribe(models => this.modelsSubject.next(models));
  }

  constructor(private articleService: IArticleService) {
    super();
  }
}