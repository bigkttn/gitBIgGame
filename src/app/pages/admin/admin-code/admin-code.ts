import { Component } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-code',
  imports: [AdminNavbar],
  templateUrl: './admin-code.html',
  styleUrl: './admin-code.scss'
})
export class AdminCode {
  uid: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // รับค่า uid จาก URL
    this.uid = this.route.snapshot.paramMap.get('uid');
    console.log('Admin UID:', this.uid);
  }
}
