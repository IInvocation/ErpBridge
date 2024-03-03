import { Injectable } from '@angular/core';
import { Article } from 'src/models/Article';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IArticleService {
  getAll(): Observable<Article[]>;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements IArticleService {

  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>('/api/Article/GetAll');
  }

  constructor(private readonly httpClient: HttpClient) {}
}

@Injectable({
  providedIn: 'root'
})
export class ArticleMockService implements IArticleService {

  getAll(): Observable<Article[]> {
      let articles = [
        {
          Number: "103001",
          Name: "GENO-EFK 50 µm",
          Description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (50 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
        },
        {
          Number: "103002",
          Name: "GENO-EFK 80 µm",
          Description: "GENO-EFK 50 µm mit:\r\n2 x Filterkerze (80 µm)\r\n2 x Filterglocke\r\n1 x Dichtungsgummi"
        }
      ] as Article[];
      return of(articles);
  }
}
