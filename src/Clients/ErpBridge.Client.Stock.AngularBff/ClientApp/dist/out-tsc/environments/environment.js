import { AuthService } from 'src/auth/auth.service';
import { WeatherService } from '../weather/weather.service';
import { ArticleService } from 'src/article/article.service';
export const environment = {
    production: true,
    weatherService: WeatherService,
    authService: AuthService,
    articleService: ArticleService
};
//# sourceMappingURL=environment.js.map