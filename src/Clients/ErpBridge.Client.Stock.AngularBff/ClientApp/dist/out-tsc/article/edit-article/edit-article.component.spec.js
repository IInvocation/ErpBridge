import { TestBed } from '@angular/core/testing';
import { EditArticleComponent } from './edit-article.component';
describe('EditArticleComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditArticleComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(EditArticleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=edit-article.component.spec.js.map