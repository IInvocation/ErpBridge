import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let LoginComponent = class LoginComponent {
    ngOnInit() {
        setTimeout(() => {
            this.authService.login();
        }, 500);
    }
    constructor(authService) {
        this.authService = authService;
    }
};
LoginComponent = __decorate([
    Component({
        template: '<h1>Anmelden...</h1>'
    }),
    __param(0, Inject('IAuthService'))
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map