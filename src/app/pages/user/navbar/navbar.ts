import { Component } from '@angular/core';
import { AuthService } from '../../../core/auth/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  // ปรับ type ให้ตรงกับข้อมูล user ที่มี uid
  me: { uid: string; username: string; email: string; full_name: string; imageUser?: string } | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Loop ดูทุก key ใน localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key: string | null = localStorage.key(i);
      if (!key) continue;

      const value: string | null = localStorage.getItem(key);
      if (!value) continue;
      const meStr = localStorage.getItem('biggame_me'); // key ที่คุณใช้เก็บ user
      if (meStr) {
        try {
          this.me = JSON.parse(meStr);
          console.log('Current user:', this.me);
        } catch (e) {
          console.error('Cannot parse biggame_me from localStorage', e);
          this.me = null;
        }
      } else {
        console.log('No user found in localStorage');
        this.me = null;
      }
      try {
        // ลองแปลงเป็น object
        const obj: unknown = JSON.parse(value);
        console.log('sdfsfsfsds');
        console.log(`${key} :`, obj);
      } catch (e) {
        // ถ้า parse ไม่ได้ แสดงเป็น string
        console.log(`${key} :`, value);
      }
    }

  }

  logout(): void {
    this.authService.logout();
  }
}
