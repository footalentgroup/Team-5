import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'landing', component: LandingComponent }
];