import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../auth/login.component';
import { ArticleComponent } from 'src/article/article.component';
import { ShowArticleComponent } from 'src/article/show-article/show-article.component';
import { EditArticleComponent } from 'src/article/edit-article/edit-article.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
  { path: 'article/:number/show', component: ShowArticleComponent, canActivate: [AuthGuard] },
  { path: 'article/:number/edit', component: EditArticleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
