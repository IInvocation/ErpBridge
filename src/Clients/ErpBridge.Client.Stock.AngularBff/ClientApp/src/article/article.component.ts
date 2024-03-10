import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Article } from 'src/models/Article';
import { IArticleService } from './article.service';
import { ModelDataSource } from 'src/datasources/model.datasource';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, fromEvent, merge, tap } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent implements OnInit, AfterViewInit {
  articlesSource: ModelDataSource<Article> = null as any;
  public displayedColumns = ['number', 'name', 'description'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator = null as any;
  @ViewChild(MatSort) sort: MatSort = null as any;
  @ViewChild('input') input: ElementRef = null as any;

  constructor(@Inject('IArticleService') private articleService: IArticleService) {
  }

  ngOnInit(): void {
    this.articlesSource = this.articleService.getDataSource();
    this.articlesSource.search('number', 0, 0, 5, '');
  }

  ngAfterViewInit(): void {
    this.paginator.pageSize = 5;
    
    this.articlesSource.searchResult.subscribe(res => {
      this.paginator.length = res.recordCount;
    });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.search();
        })
      )
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
}