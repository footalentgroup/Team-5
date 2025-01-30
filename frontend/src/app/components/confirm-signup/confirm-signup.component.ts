import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-confirm-signup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-signup.component.html',
  styleUrl: './confirm-signup.component.css'
})
export class ConfirmSignupComponent implements OnInit {
  userEmail: string = ''; // Variable para almacenar el correo

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Recuperamos el correo desde el servicio cuando el componente se inicializa
    this.userEmail = this.userService.getUserEmail();
  }

  redirectToEmailService() {
    const email = this.userEmail;

    if (!email) {
      alert('No se ha registrado ningún correo.');
      return;
    }

    const emailDomain = email.split('@')[1]; // Extraemos el dominio del correo

    let emailUrl = '';

    // Redirigimos al servicio correspondiente según el dominio del correo
    if (emailDomain.includes('gmail.com')) {
      emailUrl = 'https://mail.google.com/mail/u/0/#inbox'; // Gmail
    } else if (emailDomain.includes('outlook.com') || emailDomain.includes('hotmail.com')) {
      emailUrl = 'https://outlook.live.com/mail/0/inbox'; // Outlook
    } else if (emailDomain.includes('yahoo.com')) {
      emailUrl = 'https://mail.yahoo.com'; // Yahoo Mail
    } else if (emailDomain.includes('protonmail.com')) {
      emailUrl = 'https://mail.protonmail.com'; // ProtonMail
    } else {
      alert('No se pudo determinar el servicio de correo.');
      return;
    }

    // Redirigir al usuario al servicio de correo
    window.location.href = emailUrl;
  }
}