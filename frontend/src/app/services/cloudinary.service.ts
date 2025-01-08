import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  constructor() { }

  // Método para subir el avatar al servicio de Cloudinary
  async uploadAvatar(avatarFile: File): Promise<string> {
    if (avatarFile && avatarFile instanceof File) {
      try {
        const formData = new FormData();
        formData.append('file', avatarFile, avatarFile.name);
        formData.append('upload_preset', 'profile_avatar'); // Aquí va el nombre de tu preset

        const response = await fetch('https://api.cloudinary.com/v1_1/dxlz3grar/image/upload', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (response.ok) {
          return data.secure_url; // Devuelve la URL del avatar subido
        } else {
          throw new Error(data?.message || 'Error al subir la imagen');
        }
      } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error desconocido al subir el avatar');
      }
    } else {
      return ''; // Si no hay avatar, se devuelve una cadena vacía
    }
  }
}
