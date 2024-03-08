import { Injectable } from '@angular/core';
import { Article } from 'src/models/Article';
import { Observable, of, delay } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModelDataSource } from 'src/datasources/model.datasource';
import { ArticleDataSource } from './article.datasource';

export interface IArticleService {
  getAll(): Observable<Article[]>;
  search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<Article[]>;
  getDataSource() : ModelDataSource<Article>;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements IArticleService {

  constructor(private readonly httpClient: HttpClient) {}

  getDataSource(): ModelDataSource<Article> {
    return new ArticleDataSource(this);
  }

  getAll(): Observable<Article[]> {
      var x = this.httpClient.get<Article[]>('/api/Article/GetAll');
      return x;
  }
  
  search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<Article[]> {
    throw new Error('Method not implemented.');
  }
}

@Injectable({
  providedIn: 'root'
})
export class ArticleMockService implements IArticleService {
  
  getDataSource(): ModelDataSource<Article> {
    return new ArticleDataSource(this);
  }

  getAll(): Observable<Article[]> {
      let articles = [
        {
          number: "103001",
          name: "GENO-EFK 50 µm",
          description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
        },
        {
          number: "103002",
          name: "GENO-EFK 80 µm",
          description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
        },
        {
          number: "189100",
          name: "Enthärtungsanlage Typ softliQ:SD18",
          description: "Enthärtungsanlage Typ softliQ:SD18\r\nNennkapazität: 18 m³"
        },
        {
          number: "189200",
          name: "Enthärtungsanlage Typ softliQ:SD21",
          description: "Enthärtungsanlage Typ softliQ:SD21\r\nNennkapazität: 21 m³"
        },
        {
          number: "189300",
          name: "Enthärtungsanlage Typ softliQ:SD23",
          description: "Enthärtungsanlage Typ softliQ:SD2\r\nNennkapazität: 23 m³"
        }
      ] as Article[];
      return of(articles).pipe(delay(1000));
  }

  search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<Article[]> {
    throw new Error('Method not implemented.');
  }
}
