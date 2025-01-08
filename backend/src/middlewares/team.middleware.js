import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const teamStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'team-covers',
    allowed_formats: ['jpg', 'png', 'jpeg'],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const teamUpload = multer({ storage: teamStorage });

export default teamUpload;
