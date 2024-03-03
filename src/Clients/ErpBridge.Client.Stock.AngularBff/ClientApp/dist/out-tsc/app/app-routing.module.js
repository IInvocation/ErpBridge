import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { WeatherComponent } from '../weather/weather.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login.component';
import { ArticleComponent } from 'src/article/article.component';
const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'weather', component: WeatherComponent, canActivate: [AuthGuard] },
    { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map