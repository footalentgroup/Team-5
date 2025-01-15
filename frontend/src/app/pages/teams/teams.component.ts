import { Component,ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({  
  selector: 'app-teams',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
export class TeamsComponent {

  @ViewChild('teams', { static: true }) teams!: ElementRef;
  
  scrollLeft (){
    this.teams.nativeElement.scroll -=400
  }

  scrollRigh (){
    this.teams.nativeElement.scroll +=400
   }

  }