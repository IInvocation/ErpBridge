import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from 'src/models/Article';
import { IArticleService } from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {
  public articles: Article[] = [];
  public displayedColumns = ['number', 'name', 'description'];
  constructor(private http: HttpClient, @Inject('IArticleService') private articleService: IArticleService) {
  }

  ngOnInit() {
      this.articleService.getAll().subscribe({
          next: (v) => this.articles = v,
          error: (e) => console.error(e)
      });
  }
}