import { Component, inject } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../../core/auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userhistory',
  imports: [AdminNavbar, CommonModule],
  templateUrl: './userhistory.html',
  styleUrl: './userhistory.scss'
})
export class Userhistory {

  private authService = inject(AuthService);
  private router = inject(Router);

  users: User[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    this.isLoading = true;
    this.users = await this.authService.getAllUsers();
    this.isLoading = false;
  }

  viewUserHistory(uid: string): void {
    // นำทางไปยังหน้า history พร้อมส่ง uid ไปด้วย
    this.router.navigate(['/viewhistory', uid]);
  }
}
