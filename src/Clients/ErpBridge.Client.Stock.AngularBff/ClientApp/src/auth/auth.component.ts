import { Component, Inject, OnInit } from '@angular/core';
import { IAuthService } from './auth.service';
import { UserInfo } from 'src/models/UserInfo';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
  info : UserInfo = null as any;

  login() : void {
    this.authService.login();
  }

  logout() : void {
    this.authService.logout();
  }

  ngOnInit() {
  }

  constructor(@Inject('IAuthService') private authService: IAuthService) {
    this.authService.userInfo.subscribe(v => {
      this.info = v;
    });
  }
}
