import multer from 'multer';
import path from 'path';

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Guarda archivos en la carpeta 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Fecha y extensión del archivo
    },
});

// Filtrar solo imágenes permitidas
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Solo se permiten imágenes (JPEG, JPG, PNG).'), false);
    }
};

// Middleware Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

// Exportar el middleware
export default upload;
