import { Component, inject } from '@angular/core';
import { AdminNavbar } from "../admin-navbar/admin-navbar";
import { ActivatedRoute } from '@angular/router';
import { AddDiscountCodeDto, AuthService, DiscountCode } from '../../../core/auth/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-code',
  imports: [CommonModule, FormsModule, AdminNavbar],
  templateUrl: './admin-code.html',
  styleUrl: './admin-code.scss'
})
export class AdminCode {

  private authService = inject(AuthService);

  codes: DiscountCode[] = [];
  newCode!: AddDiscountCodeDto;
  isLoading = true;
  isEditMode = false;
  editingCode: DiscountCode | null = null;

  ngOnInit(): void {
    this.resetForm();
    this.loadCodes();
  }

  async loadCodes(): Promise<void> {
    this.isLoading = true;
    try {
      this.codes = await this.authService.getDiscountCodes();
    } catch (error) {
      console.error('Failed to load codes', error);
    } finally {
      this.isLoading = false;
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.onUpdateCode();
    } else {
      this.onAddCode();
    }
  }

  async onAddCode(): Promise<void> {
    try {
      await this.authService.addDiscountCode(this.newCode);
      alert('Discount code added successfully!');
      this.resetForm();
      this.loadCodes();
    } catch (error) {
      alert('Failed to add code.');
      console.error(error);
    }
  }

  onEdit(code: DiscountCode): void {
    this.isEditMode = true;
    this.editingCode = { ...code };

    if (this.editingCode.expiry_date) {
      const date = new Date(this.editingCode.expiry_date);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      this.editingCode.expiry_date = date.toISOString().slice(0, 16);
    }

    this.newCode = { ...this.editingCode };
    window.scrollTo(0, 0);
  }

  async onUpdateCode(): Promise<void> {
    if (!this.editingCode) return;

    try {
      this.editingCode = { ...this.editingCode, ...this.newCode };
      await this.authService.updateDiscountCode(this.editingCode); // <--- เรียกใช้ฟังก์ชันที่อัปเดตแล้ว
      alert('Code updated successfully!');
      this.cancelEdit();
      this.loadCodes();
    } catch (error) {
      alert('Failed to update code.');
      console.error(error);
    }
  }

  async onDelete(id: number): Promise<void> {
    if (confirm('Are you sure you want to delete this code?')) {
      try {
        await this.authService.deleteDiscountCode(id); // <--- เรียกใช้ฟังก์ชันที่อัปเดตแล้ว
        alert('Code deleted successfully!');
        this.loadCodes();
      } catch (error) {
        alert('Failed to delete code.');
        console.error(error);
      }
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.editingCode = null;
    this.resetForm();
  }

  resetForm(): void {
    this.newCode = {
      code: '',
      discount_type: 'percentage',
      discount_value: 10,
      usage_limit: 1,
      is_active: true,
      expiry_date: null
    };
  }
}
