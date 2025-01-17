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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BuildingComponent } from './pages/building/building.component';
import { ComunidadesComponent } from './pages/comunidades/comunidades.component';
import { CrearComunidadComponent } from './pages/crear-comunidad/crear-comunidad.component';
import { VerComunidadComponent } from './pages/ver-comunidad/ver-comunidad.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamsTwoComponent } from './pages/teams-two/teams-two.component';
import { TeamsThreeComponent } from './pages/teams-three/teams-three.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

// import { NgModel } from '@angular/forms';
// import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-edit', component: VerifyEditProfileComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'edit-user-profile', component: EditProfileComponent },
  { path: 'help-center', component: HelpCenterComponent },
  { path: 'building', component: BuildingComponent },
  { path: 'comunidades', component: ComunidadesComponent, title: 'comunidades' },
  { path: 'crearComunidad', component: CrearComunidadComponent },
  { path: 'verComunidad', component: VerComunidadComponent },
  { path: 'teams', component: TeamsComponent},
  { path: 'teams-two', component: TeamsTwoComponent},
  { path: 'teams-three', component: TeamsThreeComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];


export class AppRoutinModule { }
