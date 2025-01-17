import { Component,ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from '../../components/search/search.component';

  // Importaciones de iconos font awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPeopleGroup, faAddressCard, faPen, faBars, faAward } from '@fortawesome/free-solid-svg-icons';

// Importacion de componentes
import { TeamsThreeComponent } from '../teams-three/teams-three.component';
import { ComunidadesComponent } from '../comunidades/comunidades.component';

@Component({  
  selector: 'app-teams',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, TeamsThreeComponent, ComunidadesComponent, SearchComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  // Importaciones de iconos font awesome
    faPeopleGroup = faPeopleGroup
    faAddressCard = faAddressCard
    faPen = faPen
    faBars = faBars
    faAward = faAward

  @ViewChild('teams', { static: true }) teams!: ElementRef;
  
  scrollLeft (){
    this.teams.nativeElement.scroll -= 400
  }

  scrollRigh (){
    this.teams.nativeElement.scroll += 400
   }

  }
