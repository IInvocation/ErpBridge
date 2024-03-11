import { Injectable } from '@angular/core';
import { Article } from 'src/models/Article';
import { HttpClient } from '@angular/common/http';
import { ModelDataSource } from 'src/datasources/model.datasource';
import { ArticleDataSource } from './article.datasource';
import { RestDataService } from 'src/dataServices/RestDataService';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends RestDataService<Article> {
  override basePath: string = "/api/Article/";

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getDataSource(): ModelDataSource<Article> {
    return new ArticleDataSource(this);
  }
}


