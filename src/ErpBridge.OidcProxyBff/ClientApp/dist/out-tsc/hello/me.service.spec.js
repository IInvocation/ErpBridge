"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var me_service_1 = require("./me.service");
describe('MeService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(me_service_1.MeService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=me.service.spec.js.map