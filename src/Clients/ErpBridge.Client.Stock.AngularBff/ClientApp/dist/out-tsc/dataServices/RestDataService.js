import { HttpParams } from '@angular/common/http';
export class RestDataService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getAll() {
        return this.httpClient.get(this.basePath + 'GetAll');
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
        return this.httpClient.get(this.basePath + 'Search', {
            params: new HttpParams()
                .set('sortField', sortField)
                .set('direction', direction)
                .set('pageIndex', pageIndex)
                .set('pageSize', pageSize)
                .set('filter', filter)
        });
    }
}
//# sourceMappingURL=RestDataService.js.map