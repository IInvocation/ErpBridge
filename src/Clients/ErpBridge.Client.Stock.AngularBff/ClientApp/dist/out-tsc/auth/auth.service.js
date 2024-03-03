import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
let AuthService = class AuthService {
    login() {
        window.location.href = "/.auth/login";
    }
    logout() {
        window.location.href = "/.auth/end-session";
    }
    getUser() {
        return this.httpClient.get('/.auth/me');
    }
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.userInfo = new BehaviorSubject(null);
        this.isAuthenticated = new BehaviorSubject(false);
        this.getUser().subscribe(v => {
            this.userInfo.next(v);
            this.isAuthenticated.next(v != null);
        });
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
let AuthMockService = class AuthMockService {
    login() {
        this.currentUser = this.defaultUser;
        this.userInfo.next(this.currentUser);
        this.isAuthenticated.next(this.currentUser != null);
        this.router.navigateByUrl('/');
    }
    logout() {
        this.currentUser = this.emptyUser;
        this.userInfo.next(this.currentUser);
        this.isAuthenticated.next(this.currentUser != null);
        this.router.navigateByUrl('/');
    }
    getUser() {
        return of(this.currentUser);
    }
    constructor(router) {
        this.router = router;
        this.emptyUser = null;
        this.defaultUser = {
            sub: "abc-xyz",
            aud: "sample-aud",
            preferred_username: "max.mustermann@musterfirma.de",
            given_name: "Max",
            family_name: "Mustermann",
            name: "Max Mustermann",
        };
        this.currentUser = this.emptyUser;
        this.userInfo = new BehaviorSubject(this.currentUser);
        this.isAuthenticated = new BehaviorSubject(false);
    }
};
AuthMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthMockService);
export { AuthMockService };
//# sourceMappingURL=auth.service.js.map