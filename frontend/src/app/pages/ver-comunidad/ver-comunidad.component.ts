import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faUser, faCircle, faPeopleGroup, faTrophy, faShareNodes, faBell } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-ver-comunidad',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule
  ],
  templateUrl: './ver-comunidad.component.html',
  styleUrl: './ver-comunidad.component.css'
})
export class VerComunidadComponent {
  faAward = faAward
  faUser = faUser
  faCircle = faCircle
  faPeopleGroup = faPeopleGroup
  faTrophy = faTrophy
  faShareNodes = faShareNodes
  faBell = faBell
}
