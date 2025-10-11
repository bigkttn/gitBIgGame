import { Routes } from '@angular/router';
import { Login } from './pages/auth/login/login';    // ✅ เปลี่ยนเป็น Login
import { Register } from './pages/auth/register/register'; // ✅ เปลี่ยนเป็น Register
import { authGuard } from './core/guards/auth-guard';
import { Adminhome } from './pages/admin/adminhome/adminhome';
import { Userhome } from './pages/user/userhome/userhome';
import { Profile } from './pages/user/profile/profile';
import { EditProfile } from './pages/user/edit-profile/edit-profile';
import { AdminCode } from './pages/admin/admin-code/admin-code';
import { Adgame } from './pages/admin/adgame/adgame';
import { Editgame } from './pages/admin/editgame/editgame';
import { Userhistory } from './pages/admin/userhistory/userhistory';
import { Viewhistory } from './pages/admin/viewhistory/viewhistory';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },         // ✅ ใช้ Login
  { path: 'register', component: Register },   // ✅ ใช้ Register


  { path: 'adminhome/:uid', component: Adminhome, canActivate: [authGuard] },
  { path: 'Admincode/:uid', component: AdminCode, canActivate: [authGuard] },
  { path: 'Adgame/:uid', component: Adgame, canActivate: [authGuard] },
  { path: 'editgame/:uid', component: Editgame, canActivate: [authGuard] },
  { path: 'userhistory/:uid', component: Userhistory, canActivate: [authGuard] },
  { path: 'viewhistory/:uid', component: Viewhistory, canActivate: [authGuard] },

  { path: 'userhome/:uid', component: Userhome, canActivate: [authGuard] },
  { path: 'profile/:uid', component: Profile, canActivate: [authGuard] },
  { path: 'editprofile/:uid', component: EditProfile, canActivate: [authGuard] },

  { path: '**', redirectTo: '' },

];
