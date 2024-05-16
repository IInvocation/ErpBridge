import { Component, Inject } from '@angular/core';
import { Article } from 'src/models/Article';
import { ActivatedRoute } from '@angular/router';
import { IDataService } from 'src/dataServices/IDataService';

@Component({
  selector: 'app-show-article',
  templateUrl: './show-article.component.html',
  styleUrl: './show-article.component.scss'
})
export class ShowArticleComponent {
  article: Article | undefined;

  constructor(private activatedRoute: ActivatedRoute, @Inject('IArticleService') private articleService: IDataService<Article>) {   

    var num = activatedRoute.snapshot.url[1].path;

    articleService.get(num).subscribe(res => this.article = res);
  }
}
