import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatars',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const avatarUpload = multer({ storage: avatarStorage });

export default avatarUpload;