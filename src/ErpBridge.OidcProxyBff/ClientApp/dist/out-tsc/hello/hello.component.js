"use strict";
exports.__esModule = true;
exports.HelloComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var HelloComponent = /** @class */ (function () {
    function HelloComponent(meService, router) {
        this.meService = meService;
        this.router = router;
        this.userInfo$ = this.meService.getUserInfo().pipe(rxjs_1.map(function (response) {
            return {
                userInfo: response
            };
        }), rxjs_1.catchError(function (err) {
            if (err.status == 404) {
                return rxjs_1.of({});
            }
            throw err;
        }));
    }
    HelloComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-hello',
            templateUrl: './hello.component.html',
            styleUrls: ['./hello.component.scss']
        })
    ], HelloComponent);
    return HelloComponent;
}());
exports.HelloComponent = HelloComponent;
//# sourceMappingURL=hello.component.js.map