"use strict";
exports.__esModule = true;
exports.AppModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var hello_component_1 = require("src/hello/hello.component");
var me_service_1 = require("src/hello/me.service");
var http_1 = require("@angular/common/http");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                hello_component_1.HelloComponent
            ],
            imports: [
                http_1.HttpClientModule,
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [me_service_1.MeService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map