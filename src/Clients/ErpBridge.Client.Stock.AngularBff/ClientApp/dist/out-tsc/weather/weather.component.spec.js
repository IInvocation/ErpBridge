import { TestBed } from '@angular/core/testing';
import { WeatherComponent } from './weather.component';
describe('WeatherComponent', () => {
    let component;
    let fixture;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WeatherComponent]
        })
            .compileComponents();
        fixture = TestBed.createComponent(WeatherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=weather.component.spec.js.map