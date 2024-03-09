import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { SearchResult } from "src/models/SearchResult";

export abstract class ModelDataSource<T> extends DataSource<T> {
    protected searchSubject: BehaviorSubject<SearchResult<T>> = new BehaviorSubject<SearchResult<T>>(new SearchResult<T>);
    protected modelsSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    protected loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
    public searchResult = this.searchSubject.asObservable();
    public loading$ = this.loadingSubject.asObservable();

    override connect(_collectionViewer: CollectionViewer): Observable<readonly T[]> {
        return this.modelsSubject.asObservable();
    }

    override disconnect(_collectionViewer: CollectionViewer): void {
    }

    abstract search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): void;
}