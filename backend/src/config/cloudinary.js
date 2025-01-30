import { v2 as cloudinary } from 'cloudinary';

/**
 * Configuración de Cloudinary para la gestión de archivos multimedia en la nube.
 * 
 * Se establecen las credenciales mediante las variables de entorno para asegurar la seguridad y flexibilidad.
 */
cloudinary.config({
  // Nombre del servicio en Cloudinary
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,

  // Clave API proporcionada por Cloudinary
  api_key: process.env.CLOUDINARY_API_KEY,

  // Secreto API para la autenticación segura
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
