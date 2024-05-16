import { Observable, delay, of } from 'rxjs';
import { ModelDataSource } from "src/datasources/model.datasource";
import { SearchResult } from 'src/models/SearchResult';
import { IDataService } from './IDataService';

export abstract class MockDataService<T> implements IDataService<T> {

    update(item: T): Observable<any> {
        return of("OK");
    }
    getAll(): Observable<T[]> {
        return of(this.samples).pipe(delay(100));
    }

    search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): Observable<SearchResult<T>> {
        var filtered = filter ? this.filter(this.samples, filter) : this.samples;
        var sorted = filtered.sort(this.by(sortField, direction));

        var res = new SearchResult();
        res.pageIndex = pageIndex;
        res.pageCount = sorted.length / pageSize;
        res.pageSize = pageSize;
        res.recordCount = sorted.length;
        res.records = sorted.slice(pageIndex * pageSize, (pageIndex * pageSize) + pageSize);

        return of(res).pipe(delay(100));
    }

    by(property: string, order: number): (a: any, b: any) => number {
        return (a, b) => {
            if (a[property] > b[property]) {
                if (order == 0) {
                    return 1;
                }
                else {
                    return -1;
                }
            }
            else if (a[property] < b[property]) {
                if (order == 0) {
                    return -1;
                }
                else {
                    return 1;
                }
            }
            return 0;
        };
    }

    abstract get(pk: any): Observable<T>;

    abstract getDataSource(): ModelDataSource<T>;

    abstract filter(records: T[], filterValue: string): T[];

    abstract samples: T[];
}