import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const eventStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'event-covers',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const eventUpload = multer({ storage: eventStorage });

export default eventUpload;