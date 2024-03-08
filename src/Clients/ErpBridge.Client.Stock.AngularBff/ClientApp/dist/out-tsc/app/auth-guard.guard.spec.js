import { TestBed } from '@angular/core/testing';
import { AuthGuard } from '../auth/auth.guard';
describe('authGuard', () => {
    const executeGuard = (...guardParameters) => TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });
    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
//# sourceMappingURL=auth-guard.guard.spec.js.map