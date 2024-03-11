import { delay, of } from 'rxjs';
import { SearchResult } from 'src/models/SearchResult';
export class MockDataService {
    getAll() {
        return of(this.samples).pipe(delay(100));
    }
    search(sortField, direction, pageIndex, pageSize, filter) {
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
    by(property, order) {
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
}
//# sourceMappingURL=MockDataService.js.map