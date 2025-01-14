import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  copied = false; // Para mostrar un mensaje temporal después de copiar.

  // Método para copiar al portapapeles el link del perfil
  copyToClipboard(): void {
    const currentUrl = window.location.href; // Obtiene la URL actual.
    navigator.clipboard.writeText(currentUrl).then(() => {
      this.copied = true; // Activa el mensaje de copiado.
      setTimeout(() => (this.copied = false), 2000); // Oculta el mensaje después de 2 segundos.
    }).catch(err => {
      console.error('Error al copiar al portapapeles: ', err);
    });
  }
}
