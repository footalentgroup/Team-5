import { Component, importProvidersFrom } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAward, faUser, faCircle, faPeopleGroup, faTrophy, faShareNodes, faBell } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-teams-two',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './teams-two.component.html',
  styleUrl: './teams-two.component.css'
})
export class TeamsTwoComponent {
  faAward = faAward
  faUser = faUser
  faCircle = faCircle
  faPeopleGroup = faPeopleGroup
  faTrophy = faTrophy
  faShareNodes = faShareNodes
  faBell = faBell
}
