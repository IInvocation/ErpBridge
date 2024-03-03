import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let AuthComponent = class AuthComponent {
    login() {
        this.authService.login();
    }
    logout() {
        this.authService.logout();
    }
    ngOnInit() {
    }
    constructor(authService) {
        this.authService = authService;
        this.info = null;
        this.authService.userInfo.subscribe(v => {
            this.info = v;
        });
    }
};
AuthComponent = __decorate([
    Component({
        selector: 'app-auth',
        templateUrl: './auth.component.html',
        styleUrl: './auth.component.scss'
    }),
    __param(0, Inject('IAuthService'))
], AuthComponent);
export { AuthComponent };
//# sourceMappingURL=auth.component.js.map