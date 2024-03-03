import { __decorate, __param } from "tslib";
import { Injectable, Inject, inject } from '@angular/core';
import { DefaultUrlSerializer } from '@angular/router';
let AuthPermissionsService = class AuthPermissionsService {
    canActivate(route, state) {
        var result = this.authService.isAuthenticated.getValue();
        if (result)
            return result;
        return new DefaultUrlSerializer().parse("login");
    }
    constructor(authService) {
        this.authService = authService;
    }
};
AuthPermissionsService = __decorate([
    Injectable(),
    __param(0, Inject('IAuthService'))
], AuthPermissionsService);
export { AuthPermissionsService };
export const AuthGuard = (route, state) => {
    return inject(AuthPermissionsService).canActivate(route, state);
};
//# sourceMappingURL=auth.guard.js.map