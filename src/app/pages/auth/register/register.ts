import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form!: FormGroup;
  loading = false;

  avatarImg: string | null = null; // ใช้กับ template preview
  selectedFile: File | null = null;

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onAvatarChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarImg = reader.result as string; // อัปเดตตัวแปร avatarImg สำหรับ template
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async submit() {
    if (!this.form.valid) return;

    const formData = new FormData();
    formData.append('username', this.form.value.username);
    formData.append('email', this.form.value.email);
    formData.append('password', this.form.value.password);

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.loading = true;
    const res = await this.auth.registerFormData(formData);
    this.loading = false;

    if (res.ok) {
      console.log('Registered user:', res.user);
      this.router.navigateByUrl('/login');
    } else {
      console.error('Register failed:', res.message);
    }
  }
}
