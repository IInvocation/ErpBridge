import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { SearchResult } from "src/models/SearchResult";
export class ModelDataSource extends DataSource {
    constructor() {
        super(...arguments);
        this.searchSubject = new BehaviorSubject(new SearchResult);
        this.modelsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.searchResult = this.searchSubject.asObservable();
        this.loading$ = this.loadingSubject.asObservable();
    }
    connect(_collectionViewer) {
        return this.modelsSubject.asObservable();
    }
    disconnect(_collectionViewer) {
    }
}
//# sourceMappingURL=model.datasource.js.map