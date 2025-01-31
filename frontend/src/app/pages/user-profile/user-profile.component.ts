import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit, OnDestroy {
  copied = false; // Para mostrar un mensaje temporal después de copiar.
  currentUser: any;
  fakeFriendsCount!: number; // Número aleatorio de amigos
  private userSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.generateFakeFriendsCount(); // Generar número al inicializar
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  // Genera un número aleatorio entre 50 y 200 (ajusta los valores según quieras)
  private generateFakeFriendsCount(): void {
    this.fakeFriendsCount = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  // Método para copiar al portapapeles el link del perfil
  copyToClipboard(): void {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      this.copied = true;
      alert('¡Enlace copiado al portapapeles!');
      setTimeout(() => (this.copied = false), 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  }
}
