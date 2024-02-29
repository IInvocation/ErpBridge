"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var hello_component_1 = require("./hello.component");
describe('HelloComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [hello_component_1.HelloComponent]
        });
        fixture = testing_1.TestBed.createComponent(hello_component_1.HelloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=hello.component.spec.js.map