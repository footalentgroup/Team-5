import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // Obtener el token del localStorage

  if (token) {
    try {
      // Decodifica el JWT para obtener los datos del payload
      const tokenData = JSON.parse(atob(token.split('.')[1]));

      // Verifica si el token tiene el campo exp y si está expirado
      if (tokenData.exp) {
        const isExpired = tokenData.exp < Date.now() / 1000; // Convertir Date.now() a segundos

        if (isExpired) {
          // Si el token ha expirado, elimínalo y redirige al login
          localStorage.removeItem('token');
          router.navigate(['/login']);
          return false;
        }
      } else {
        console.error("El token no tiene el campo 'exp'.");
        localStorage.removeItem('token');
        router.navigate(['/login']);
        return false;
      }

      // Si el token es válido y no ha expirado
      return true;
    } catch (error) {
      // Si ocurre un error en la decodificación (token inválido o malformado)
      console.error("Error al decodificar el token:", error);
      localStorage.removeItem('token');
      router.navigate(['/login']);
      return false;
    }
  } else {
    // Si no hay token, redirige al login
    console.log("No hay token, redirigiendo al login...");
    router.navigate(['/login']);
    return false;
  }
}