import { Component } from '@angular/core';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
