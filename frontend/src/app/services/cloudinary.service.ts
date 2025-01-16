// Importación del decorador Injectable, que permite que este servicio sea inyectado en otros componentes o servicios.
import { Injectable } from '@angular/core';

// Decorador para declarar que este servicio estará disponible a nivel de toda la aplicación.
@Injectable({
  providedIn: 'root' // Indica que este servicio se proporciona en el nivel raíz del módulo.
})
export class CloudinaryService {

  // Constructor vacío, ya que este servicio no necesita inicializar dependencias.
  constructor() { }

  /**
   * Método para subir un archivo (avatar) al servicio de Cloudinary.
   * @param avatarFile - Archivo del avatar seleccionado por el usuario.
   * @returns Una promesa que se resuelve con la URL del avatar subido o lanza un error.
   */
  async uploadAvatar(avatarFile: File): Promise<string> {
    // Verifica que el archivo proporcionado no sea nulo y sea una instancia de File.
    if (avatarFile && avatarFile instanceof File) {
      try {
        // Crea un objeto FormData para enviar el archivo al servidor.
        const formData = new FormData();
        formData.append('file', avatarFile, avatarFile.name); // Agrega el archivo al FormData.
        formData.append('upload_preset', 'profile_avatar'); // Configura el preset de subida en Cloudinary.

        // Realiza una solicitud HTTP POST a la API de Cloudinary para subir la imagen.
        const response = await fetch('https://api.cloudinary.com/v1_1/dxlz3grar/image/upload', {
          method: 'POST', // Método HTTP para enviar los datos.
          body: formData // El cuerpo de la solicitud contiene los datos del formulario.
        });

        // Intenta analizar la respuesta de la API como JSON.
        const data = await response.json();

        // Si la respuesta es exitosa (código de estado HTTP 2xx), retorna la URL segura del avatar.
        if (response.ok) {
          return data.secure_url; // Devuelve la URL de acceso público al avatar subido.
        } else {
          // Si ocurre un error en la solicitud, lanza un error con el mensaje proporcionado por Cloudinary o un mensaje genérico.
          throw new Error(data?.message || 'Error al subir la imagen');
        }
      } catch (error) {
        // Maneja cualquier excepción ocurrida durante la subida o el manejo de la respuesta.
        throw new Error(
          error instanceof Error ? error.message : 'Error desconocido al subir el avatar'
        );
      }
    } else {
      // Si no se proporciona un archivo válido, retorna una cadena vacía como respuesta.
      return '';
    }
  }
}