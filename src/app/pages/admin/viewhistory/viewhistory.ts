import { Component, inject, OnInit } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { AuthService, PurchaseHistoryItem, User, Wallet, WalletHistory } from '../../../core/auth/auth';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoginResponse } from '../../../core/models/user.model';

@Component({
  selector: 'app-viewhistory',
  standalone: true, // << เพิ่ม
  imports: [AdminNavbar, CommonModule],
  templateUrl: './viewhistory.html',
  styleUrl: './viewhistory.scss'
})
export class Viewhistory implements OnInit {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  // ✅ 1. เพิ่ม property สำหรับเก็บข้อมูล User
  user: LoginResponse | null = null;

  purchaseHistory: PurchaseHistoryItem[] = [];
  walletHistory: WalletHistory[] = [];

  isLoading = true;
  errorMessage = '';
  userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('uid');

    if (this.userId) {
      this.loadAllHistory(this.userId);
    } else {
      this.errorMessage = "User ID not found in URL.";
      this.isLoading = false;
    }
  }

  async loadAllHistory(userId: string): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      // ✨ 2. เพิ่ม getUserByUid เข้าไปใน Promise.all
      const [userData, purchaseData, walletData] = await Promise.all([
        this.authService.getUserByUid(userId), // <-- เพิ่มการเรียก service นี้
        this.authService.getPurchaseHistory(userId),
        this.authService.getWalletHistory(userId)
      ]);

      // 3. กำหนดค่าให้กับ property ที่สร้างขึ้นมาใหม่
      this.user = userData;
      this.purchaseHistory = purchaseData;
      this.walletHistory = walletData;

    } catch (error) {
      console.error("Failed to load user history:", error);
      this.errorMessage = "Could not load user history. Please try again later.";
    } finally {
      this.isLoading = false;
    }
  }
}


