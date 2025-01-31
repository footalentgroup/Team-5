import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  ReactiveFormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Respawn Events';
  verFooter = true;
  verNavbar = true;
  padding = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/signup', '/login']; // Oculta lo que se necesite en la página de signup y login
      this.verFooter = !hiddenRoutes.includes(this.router.url);
      this.verNavbar = !hiddenRoutes.includes(this.router.url);
      this.padding = !hiddenRoutes.includes(this.router.url);
    });
  }
}
