import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from 'src/environments/environment';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { HomeComponent } from '../home/home.component';
import { AuthComponent } from 'src/auth/auth.component';
import { AuthPermissionsService } from '../auth/auth.guard';
import { ArticleComponent } from 'src/article/article.component';
import { ShowArticleComponent } from 'src/article/show-article/show-article.component';
import { EditArticleComponent } from 'src/article/edit-article/edit-article.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            AuthComponent,
            NavMenuComponent,
            HomeComponent,
            ArticleComponent,
            ShowArticleComponent,
            EditArticleComponent
        ],
        imports: [
            HttpClientModule,
            BrowserModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            FormsModule,
            MatInputModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatProgressSpinnerModule,
            MatToolbarModule,
            NgbModule
        ],
        providers: [
            {
                provide: 'IAuthService',
                useClass: environment.authService
            },
            {
                provide: 'IArticleService',
                useClass: environment.articleService
            },
            provideAnimationsAsync(),
            AuthPermissionsService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map