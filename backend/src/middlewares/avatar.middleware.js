import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

/**
 * Configuración del almacenamiento de archivos para avatares en Cloudinary.
 */
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars', // Carpeta en Cloudinary donde se almacenarán los avatares
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos para los archivos
        /**
         * Define el public_id de los archivos subidos a Cloudinary.
         * Utiliza la marca de tiempo actual para evitar colisiones de nombre.
         */
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

/**
 * Middleware de carga de archivos configurado con Multer y Cloudinary.
 */
const avatarUpload = multer({ 
    storage: avatarStorage,
    fileFilter: (req, file, cb) => {
        // Validación del tipo de archivo
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no permitido. Solo se permiten JPG, JPEG y PNG.'));
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024, // Límite de 2MB por archivo
    }
});

/**
 * Exporta el middleware de Multer configurado para el manejo de avatares.
 */
export default avatarUpload;
