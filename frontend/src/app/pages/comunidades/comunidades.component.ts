import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comunidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comunidades.component.html',
  styleUrl: './comunidades.component.css'
})
export class ComunidadesComponent {
}
