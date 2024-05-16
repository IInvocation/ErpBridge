import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from 'src/models/SearchResult';
import { IDataService } from './IDataService';

const headers = { 'Content-Type': 'application/json' };

export abstract class RestDataService<T> implements IDataService<T> {
    abstract basePath: string;

    constructor(private readonly httpClient: HttpClient) { }  

    update(item: T): Observable<any> {
        var json = JSON.stringify(item);
        return this.httpClient.put(this.basePath, json, { headers });
    }

    get(pk: any): Observable<T> {
        return this.httpClient.get<T>(this.basePath + pk);
    }

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