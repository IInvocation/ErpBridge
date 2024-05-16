import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../auth/login.component';
import { ArticleComponent } from 'src/article/article.component';
import { ShowArticleComponent } from 'src/article/show-article/show-article.component';
import { EditArticleComponent } from 'src/article/edit-article/edit-article.component';
const routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
    { path: 'article/:number/show', component: ShowArticleComponent, canActivate: [AuthGuard] },
    { path: 'article/:number/edit', component: EditArticleComponent, canActivate: [AuthGuard] }
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