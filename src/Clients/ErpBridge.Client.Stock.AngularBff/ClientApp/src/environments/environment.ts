import { AuthService } from 'src/auth/auth.service';
import { ArticleService } from 'src/article/article.service';

export const environment = {
    production: true,
    authService: AuthService,
    articleService: ArticleService
};
