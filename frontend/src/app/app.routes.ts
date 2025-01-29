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
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { CrearComunidadComponent } from './pages/crear-comunidad/crear-comunidad.component';
import { VerComunidadComponent } from './pages/ver-comunidad/ver-comunidad.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { TeamsTwoComponent } from './pages/teams-two/teams-two.component';
import { TeamsThreeComponent } from './pages/teams-three/teams-three.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfirmSignupComponent } from './components/confirm-signup/confirm-signup.component';

/**
 * Definición de las rutas de la aplicación.
 * Se establece una ruta para cada componente de la aplicación, con sus respectivos métodos de navegación.
 */
export const routes: Routes = [
  // Ruta principal a la página de aterrizaje (Landing)
  { path: 'landing', component: LandingComponent },
  
  // Rutas para el flujo de autenticación y perfil de usuario
  { path: 'login', component: LoginComponent }, // Ruta para el login de usuario
  { path: 'signup', component: SignupComponent }, // Ruta para la registración de usuario
  { path: 'verify-edit', component: VerifyEditProfileComponent }, // Ruta para la verificación de edición del perfil
  { path: 'verify-email', component: VerifyEmailComponent }, // Ruta para la verificación de email
  { path: 'user-profile', component: UserProfileComponent }, // Ruta para mostrar el perfil de usuario
  { path: 'edit-user-profile', component: EditProfileComponent }, // Ruta para editar el perfil del usuario
  
  // Rutas para páginas adicionales
  { path: 'help-center', component: HelpCenterComponent }, // Ruta para la sección de ayuda
  { path: 'building', component: BuildingComponent }, // Ruta para una página de construcción
  
  // Rutas relacionadas con comunidades
  { path: 'comunidades', component: ComunidadesComponent, title: 'comunidades' }, // Ruta para la visualización de comunidades
  { path: 'create-event', component: CreateEventComponent }, // Ruta para la creación de eventos
  { path: 'crearComunidad', component: CrearComunidadComponent }, // Ruta para la creación de comunidades
  { path: 'verComunidad', component: VerComunidadComponent }, // Ruta para ver detalles de una comunidad
  
  // Rutas para equipos
  { path: 'teams', component: TeamsComponent }, // Ruta para visualizar equipos
  { path: 'teams-two', component: TeamsTwoComponent }, // Ruta para equipos - segundo nivel
  { path: 'teams-three', component: TeamsThreeComponent }, // Ruta para equipos - tercer nivel

  // Ruta para el panel de administración o Dashboard
  { path: 'dashboard', component: DashboardComponent }, // Ruta para el dashboard principal
  
  // Ruta para la confirmación de la registración de usuario
  { path: 'confirm-signup', component: ConfirmSignupComponent },

  // Ruta por defecto: redirige al landing si no se encuentra ninguna ruta
  { path: '', redirectTo: '/landing', pathMatch: 'full' },

  // Ruta para manejar cualquier URL no válida (404)
  { path: '**', component: NotFoundComponent }, // Ruta para página de "No encontrado"
];

/**
 * El orden de las rutas es importante. Se recomienda tener las rutas más específicas al principio
 * y las más generales (como la de redirección o el 404) al final.
 * 
 * El patrón es el siguiente:
 * 1. Rutas generales al principio.
 * 2. Rutas de autenticación y de flujo de usuario a continuación.
 * 3. Rutas de funcionalidades específicas como comunidades, equipos, etc.
 * 4. Las rutas de "no encontrado" deben ir al final para capturar cualquier URL no reconocida.
 */
export class AppRoutinModule { }
