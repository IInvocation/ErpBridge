import { AuthMockService } from 'src/auth/auth.service';
import { WeatherMockService } from '../weather/weather.service';
import { ArticleMockService } from 'src/article/article.service';
export const environment = {
    production: false,
    weatherService: WeatherMockService,
    authService: AuthMockService,
    articleService: ArticleMockService
};
//# sourceMappingURL=environment.vscode.js.map