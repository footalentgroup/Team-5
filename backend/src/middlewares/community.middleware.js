import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const communityStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'community-covers',
        allowed_formats: ['jpg', 'png', 'jpeg'],
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const communityUpload = multer({ storage: communityStorage });

export default communityUpload;