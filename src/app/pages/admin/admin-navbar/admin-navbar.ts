import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterModule],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.scss'
})
export class AdminNavbar {
  me: { uid: string; username: string; email: string; full_name: string; imageUser?: string } | null = null;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const meStr = localStorage.getItem('biggame_me');
    if (meStr) {
      try {
        this.me = JSON.parse(meStr);
        console.log('Current user:', this.me);
      } catch (e) {
        console.error('Cannot parse biggame_me from localStorage', e);
      }
    } else {
      console.log('No user found in localStorage');
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
