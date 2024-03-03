import { __decorate, __param } from "tslib";
import { Component, Inject } from '@angular/core';
let NavMenuComponent = class NavMenuComponent {
    collapse() {
        this.isExpanded = false;
    }
    toggle() {
        this.isExpanded = !this.isExpanded;
    }
    constructor(authService) {
        this.authService = authService;
        this.isExpanded = false;
        this.isAuthenticated = false;
        this.authService.isAuthenticated.subscribe(v => {
            this.isAuthenticated = v;
        });
    }
};
NavMenuComponent = __decorate([
    Component({
        selector: 'app-nav-menu',
        standalone: false,
        templateUrl: './nav-menu.component.html',
        styleUrl: './nav-menu.component.scss'
    }),
    __param(0, Inject('IAuthService'))
], NavMenuComponent);
export { NavMenuComponent };
//# sourceMappingURL=nav-menu.component.js.map