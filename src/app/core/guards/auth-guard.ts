import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth'; // ✅ เปลี่ยนจาก ../auth/auth.service เป็น ../auth/auth

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);  // inject service
  const router = inject(Router);     // inject router

  if (auth.isLoggedIn()) return true; // มี login → อนุญาต
  router.navigate(['/login']);         // ไม่มี login → redirect
  return false;
};
