import { Observable } from 'rxjs';
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from 'src/models/SearchResult';

export interface IDataService<T> {
    update(item: T): Observable<any>;
    get(pk: any): Observable<T>;
    getAll(): Observable<T[]>;
    search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<SearchResult<T>>;
    getDataSource() : ModelDataSource<T>;
}