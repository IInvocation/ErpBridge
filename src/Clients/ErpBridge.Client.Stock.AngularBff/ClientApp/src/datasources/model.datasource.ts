import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";

export abstract class ModelDataSource<T> extends DataSource<T> {
    protected modelsSubject : BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
    protected loadingSubject : BehaviorSubject<boolean> = new BehaviorSubject(false);

    public loading$ = this.loadingSubject.asObservable();

    override connect(_collectionViewer: CollectionViewer): Observable<readonly T[]> {
        return this.modelsSubject.asObservable();
    }

    override disconnect(_collectionViewer: CollectionViewer): void {
        this.modelsSubject.complete();
        this.loadingSubject.complete();
    }

    abstract search(sortField: string, direction: number, pageIndex: number, pageSize: number, filter: string): void;
}