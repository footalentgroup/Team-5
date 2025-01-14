import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { VerifyEditProfileComponent } from './components/verify-edit-profile/verify-edit-profile.component';
import { HelpCenterComponent } from './pages/help-center/help-center.component';

export const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-edit', component: VerifyEditProfileComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'edit-user-profile', component: EditProfileComponent },
  { path: 'help-center', component: HelpCenterComponent },
];