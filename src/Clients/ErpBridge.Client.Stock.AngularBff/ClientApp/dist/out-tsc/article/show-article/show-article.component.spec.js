import { TestBed } from '@angular/core/testing';
import { ShowArticleComponent } from './show-article.component';
describe('ShowArticleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ShowArticleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(ShowArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=show-article.component.spec.js.map