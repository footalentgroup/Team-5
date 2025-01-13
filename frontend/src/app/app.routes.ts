import { Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent, title: 'dashboard'},
  { path: 'comunidades', component: ComunidadesComponent, title: 'comunidades' }
];

