import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let GerPaginatorIntl = class GerPaginatorIntl {
    constructor() {
        this.changes = new Subject();
        // For internationalization, the `$localize` function from
        // the `@angular/localize` package can be used.
        this.firstPageLabel = $localize `Erste Seite`;
        this.itemsPerPageLabel = $localize `Einträge pro Seite:`;
        this.lastPageLabel = $localize `Letzte Seite`;
        // You can set labels to an arbitrary string too, or dynamically compute
        // it through other third-party internationalization libraries.
        this.nextPageLabel = 'Nächste Seite';
        this.previousPageLabel = 'Vorherige Seite';
    }
    getRangeLabel(page, pageSize, length) {
        if (length === 0) {
            return $localize `Seite 1 von 1`;
        }
        const amountPages = Math.ceil(length / pageSize);
        return $localize `Seite ${page + 1} von ${amountPages}`;
    }
};
GerPaginatorIntl = __decorate([
    Injectable()
], GerPaginatorIntl);
export { GerPaginatorIntl };
//# sourceMappingURL=GetPaginatorIntl.js.map