import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/models/Article';
import { IArticleService } from './article.service';
import { ModelDataSource } from 'src/datasources/model.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, AfterViewInit {
  articlesSource: ModelDataSource<Article> = null as any;
  public displayedColumns = ['number', 'name', 'description'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator = null as any;
  
  constructor(@Inject('IArticleService') private articleService: IArticleService) {
  }

  ngOnInit(): void {
    this.articlesSource = this.articleService.getDataSource();
    this.articlesSource.search('number', 0, 0, 5, '');
  }

  ngAfterViewInit(): void {
    this.paginator.pageSize = 5;

    this.articlesSource.searchResult.subscribe(res => {
      this.paginator.length = res.length;
    });

    this.paginator.page.subscribe(() => {
      this.articlesSource.search('number', 0, this.paginator.pageIndex, this.paginator.pageSize, '');
    });
  }
}