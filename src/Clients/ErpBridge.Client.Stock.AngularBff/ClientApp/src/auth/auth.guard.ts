import { Injectable, Inject, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, DefaultUrlSerializer, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IAuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthPermissionsService {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    var result = this.authService.isAuthenticated.getValue();
    if (result)
      return result;
    return new DefaultUrlSerializer().parse("login")
  }

  constructor(@Inject('IAuthService') private authService: IAuthService) {
  }
}

export const AuthGuard: CanActivateFn = (route, state) => {
  return inject(AuthPermissionsService).canActivate(route, state);
};
