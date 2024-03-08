import { Component, Inject, OnInit } from '@angular/core';
import { IAuthService } from 'src/auth/auth.service';

@Component({
  template: '<h1>Anmelden...</h1>'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.authService.login();
    }, 500);
  }

  constructor(@Inject('IAuthService') private authService: IAuthService) {
  }
}
