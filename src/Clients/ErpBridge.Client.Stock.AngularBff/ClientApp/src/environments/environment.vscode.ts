import { AuthMockService } from 'src/auth/auth.service';
import { ArticleMockService } from 'src/article/article.service';

export const environment = {
    production: false,
    authService: AuthMockService,
    articleService: ArticleMockService
};
