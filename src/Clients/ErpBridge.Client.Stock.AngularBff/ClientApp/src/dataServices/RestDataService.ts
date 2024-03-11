import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from 'src/models/SearchResult';
import { IDataService } from './IDataService';

export abstract class RestDataService<T> implements IDataService<T> {
    abstract basePath: string;

    constructor(private readonly httpClient: HttpClient) { }

    getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(this.basePath + 'GetAll');
    }
    search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<SearchResult<T>> {
        return this.httpClient.get<SearchResult<T>>(this.basePath + 'Search', {
            params: new HttpParams()
                .set('sortField', sortField)
                .set('direction', direction)
                .set('pageIndex', pageIndex)
                .set('pageSize', pageSize)
                .set('filter', filter)
        });
    }

    abstract getDataSource(): ModelDataSource<T>;
}