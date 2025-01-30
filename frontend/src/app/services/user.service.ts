import { Injectable } from '@angular/core';

/**
 * Servicio para gestionar la información del usuario, específicamente el correo electrónico.
 * Este servicio permite establecer y obtener el correo electrónico del usuario en cualquier parte de la aplicación.
 */
@Injectable({
  providedIn: 'root' // Indica que este servicio está disponible de forma global en la aplicación.
})
export class UserService {
  // Variable privada que almacena el correo electrónico del usuario.
  private userEmail: string = '';
  
  constructor() { }

  /**
   * Establece el correo electrónico del usuario.
   * 
   * @param email El correo electrónico que se desea asignar al usuario.
   */
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  /**
   * Obtiene el correo electrónico almacenado del usuario.
   * 
   * @returns El correo electrónico almacenado del usuario.
   */
  getUserEmail(): string {
    return this.userEmail;
  }
}
