import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { WeatherComponent } from '../weather/weather.component';
import { AuthGuard } from '../auth/auth.guard';
import { LoginComponent } from '../auth/login.component';
import { ArticleComponent } from 'src/article/article.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'weather', component: WeatherComponent, canActivate: [AuthGuard] },
  { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
