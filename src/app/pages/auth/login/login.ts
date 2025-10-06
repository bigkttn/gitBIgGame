import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth';
import { LoginResponse } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  loading = false;
  avatarPreview: string | null = null;

  ngOnInit() {
    // ถ้ามี user เก่าใน localStorage ให้ preview avatar
    const me = localStorage.getItem('biggame_me');
    if (me) {
      const user: LoginResponse = JSON.parse(me);
      this.avatarPreview = user.imageUser || null;
    }
  }

  async submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loading = true;
    const res: LoginResponse = await this.auth.login(this.form.value as any);
    this.loading = false;

    if (!res || !res.uid) {
      alert(res.message || 'Login failed');
      return;
    }

    this.avatarPreview = res.imageUser || null;

    // Redirect ตาม role
    if (res.role === 'admin') {
      this.router.navigate(['/adminhome', res.uid]);
    } else {
      this.router.navigate(['/userhome', res.uid]);
    }
  }
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) return true;
    this.router.navigate(['/login']);
    return false;
  }

}
