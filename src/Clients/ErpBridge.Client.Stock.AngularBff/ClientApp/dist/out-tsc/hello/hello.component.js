import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
let HelloComponent = class HelloComponent {
    constructor(meService) {
        this.meService = meService;
        this.userInfo$ = this.meService.getUserInfo().pipe(map(response => {
            return {
                userInfo: response
            };
        }), catchError(err => {
            if (err.status == 404) {
                return of({});
            }
            throw err;
        }));
    }
};
HelloComponent = __decorate([
    Component({
        selector: 'app-hello',
        templateUrl: './hello.component.html',
        styleUrls: ['./hello.component.scss']
    }),
    __param(0, Inject('IMeService'))
], HelloComponent);
export { HelloComponent };
//# sourceMappingURL=hello.component.js.map