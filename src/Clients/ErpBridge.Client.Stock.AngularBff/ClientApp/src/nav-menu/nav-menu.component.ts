import { Component, Inject } from '@angular/core';
import { IAuthService } from 'src/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: false,
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {
    isExpanded = false;
    isAuthenticated : boolean = false;

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    constructor(@Inject('IAuthService') private authService: IAuthService) {
        this.authService.isAuthenticated.subscribe(v => {
            this.isAuthenticated = v;      
          });
    }
}
