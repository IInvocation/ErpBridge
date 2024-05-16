import { HttpParams } from '@angular/common/http';
const headers = { 'Content-Type': 'application/json' };
export class RestDataService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    update(item) {
        var json = JSON.stringify(item);
        return this.httpClient.put(this.basePath, json, { headers });
    }
    get(pk) {
        return this.httpClient.get(this.basePath + pk);
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