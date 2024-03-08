import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
export class ModelDataSource extends DataSource {
    constructor() {
        super(...arguments);
        this.modelsSubject = new BehaviorSubject([]);
        this.loadingSubject = new BehaviorSubject(false);
        this.loading$ = this.loadingSubject.asObservable();
    }
    connect(_collectionViewer) {
        return this.modelsSubject.asObservable();
    }
    disconnect(_collectionViewer) {
        this.modelsSubject.complete();
        this.loadingSubject.complete();
    }
}
//# sourceMappingURL=model.datasource.js.map