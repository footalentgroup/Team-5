import { Routes } from '@angular/router';


import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamsTwoComponent } from './pages/teams-two/teams-two.component';

// import { NgModel } from '@angular/forms';
// import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, //Ruta prederteminada
  // { path: '**', redirectTo: '/home', pathMatch: 'full' }, // Comodin para rutas no encontradas "pendiente modificar (error)"
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent, title: 'dashboard'},
  { path: 'teams', component: TeamsComponent},
  { path: 'teams-two', component: TeamsTwoComponent}
];

// @NgModule({
//   imports: [RouterModule],
//   exports: [RouterModule]
// }
// )

export class AppRoutinModule { }
