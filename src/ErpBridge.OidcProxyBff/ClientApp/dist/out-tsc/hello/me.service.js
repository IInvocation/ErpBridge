"use strict";
exports.__esModule = true;
exports.MeService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var MeService = /** @class */ (function () {
    function MeService(httpClient) {
        this.httpClient = httpClient;
    }
    MeService.prototype.getUserInfo = function () {
        return this.httpClient.get('/.auth/me');
    };
    MeService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MeService);
    return MeService;
}());
exports.MeService = MeService;
//# sourceMappingURL=me.service.js.map