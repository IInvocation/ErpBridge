import { TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
describe('ArticleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ArticleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=article.component.spec.js.map