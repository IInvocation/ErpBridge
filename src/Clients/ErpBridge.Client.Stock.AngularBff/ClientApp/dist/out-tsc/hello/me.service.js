import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
let MeService = class MeService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    getUserInfo() {
        return this.httpClient.get('/.auth/me');
    }
};
MeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MeService);
export { MeService };
let MeMockService = class MeMockService {
    getUserInfo() {
        let info = {};
        info.sub = "abc-xyz";
        info.aud = "sample-aud";
        info.preferred_username = "max.mustermann@musterfirma.de";
        info.given_name = "Max";
        info.family_name = "Mustermann";
        info.name = "Max Mustermann";
        return of(info);
    }
};
MeMockService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MeMockService);
export { MeMockService };
//# sourceMappingURL=me.service.js.map