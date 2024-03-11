import { Observable } from 'rxjs';
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from 'src/models/SearchResult';

export interface IDataService<T> {
    getAll(): Observable<T[]>;
    search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<SearchResult<T>>;
    getDataSource() : ModelDataSource<T>;
}