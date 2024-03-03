import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserInfo } from 'src/models/UserInfo';
import { Router } from '@angular/router';

export interface IAuthService {
  getUser() : Observable<UserInfo>;
  login(): void;
  logout(): void;
  userInfo: BehaviorSubject<UserInfo>;
  isAuthenticated : BehaviorSubject<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService {

  login(): void {
    window.location.href = "/.auth/login"
  }

  logout() : void {
    window.location.href = "/.auth/end-session";
  }

  getUser(): Observable<UserInfo> {
    return this.httpClient.get<UserInfo>('/.auth/me');
  }

  userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(null as any);

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly httpClient: HttpClient) {
    this.getUser().subscribe(v => {
      this.userInfo.next(v);
      this.isAuthenticated.next(v != null);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthMockService implements IAuthService {
  private emptyUser : UserInfo = null as any;

  private defaultUser : UserInfo = {
    sub: "abc-xyz",
    aud: "sample-aud",
    preferred_username: "max.mustermann@musterfirma.de",
    given_name: "Max",
    family_name: "Mustermann",
    name: "Max Mustermann",
  }

  private currentUser: UserInfo = this.emptyUser;
  
  login(): void {
    this.currentUser = this.defaultUser;
    this.userInfo.next(this.currentUser);
    this.isAuthenticated.next(this.currentUser != null);
    this.router.navigateByUrl('/');
  }

  logout() : void {
    this.currentUser = this.emptyUser;
    this.userInfo.next(this.currentUser);
    this.isAuthenticated.next(this.currentUser != null);
    this.router.navigateByUrl('/');
  }

  getUser(): Observable<UserInfo> {
    return of(this.currentUser);
  }

  userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject(this.currentUser);

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {    
  }
}