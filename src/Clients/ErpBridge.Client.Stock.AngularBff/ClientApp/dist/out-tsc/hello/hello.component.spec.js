import { TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';
describe('HelloComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HelloComponent]
        });
        fixture = TestBed.createComponent(HelloComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=hello.component.spec.js.map