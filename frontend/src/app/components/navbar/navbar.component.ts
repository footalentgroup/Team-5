import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComunidadesComponent } from '../../pages/comunidades/comunidades.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink, FontAwesomeModule, FontAwesomeModule, ComunidadesComponent, RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
}
