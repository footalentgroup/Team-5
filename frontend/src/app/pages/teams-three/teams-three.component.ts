import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TeamsTwoComponent } from '../teams-two/teams-two.component';
import { TeamsService } from '../../services/teams.service';
import { TeamsComponent } from '../teams/teams.component';

// Importaciones de los iconos de font Awesome
import { faAddressCard, faUserPlus, faArrowDown, faPen, faCrown,faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teams-three',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule, TeamsTwoComponent, TeamsComponent],
  templateUrl: './teams-three.component.html',
  styleUrl: './teams-three.component.css'
})
export class TeamsThreeComponent {
  // "variables" para iconos 
  faAddressCard = faAddressCard
  faUserPlus = faUserPlus
  faArrowDown = faArrowDown 
  faPen = faPen
  faCrown = faCrown
  faArrowUp = faArrowUp 

  // Logica de equipos, crear, obtener, eliminar 

  TeamsService = inject(TeamsService); 
  allTeams : any[] = [];
  // aca obtenemos la información al hacer la petición get 
  // aca obtenemos nuestros productos

  getTeams(){
    this.TeamsService.getTeams().subscribe((res:any)=>{
      if(res){
        console.log(res);
        this.allTeams = res;
      }else {
        console.error('Hubo un error al crear el equipo');
      }
    });
  }

  // metodo que permite que se rendericen los equipos con el sitio web 
  ngOnInit(){
    this.getTeams();
    
  }

  // deleteTeam(id: string){
  //   this.TeamsService.deleteTeam(id).subscribe(()=>{

  //   });
}





