import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, SearchComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
