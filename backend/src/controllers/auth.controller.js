// Importamos las dependencias necesarias
import bcrypt from 'bcrypt'; // Librería para encriptar contraseñas
import jwt from 'jsonwebtoken'; // Librería para generar y verificar tokens JWT
import User from '../models/user.model.js'; // Modelo de datos del usuario
import { sendVerificationEmail } from '../utils/email-verification.util.js'; // Utilidad para el envío de correos de verificación
import dotenv from 'dotenv'; // Librería para cargar variables de entorno desde el archivo .env

// Cargar las variables de entorno
dotenv.config();

// Registro de usuario
export const registerUser = async (req, res) => {
    // Desestructuramos los datos enviados desde la solicitud
    const {
        name,
        lastname,
        username,
        email,
        password,
        dateBirth,
        country,
        acceptTerms,
        isOver14,
        acceptPrivacyPolicy,
    } = req.body;

    // Validación básica para verificar que todos los campos obligatorios estén presentes
    if (!name || !lastname || !username || !email || !password || !dateBirth || !acceptTerms || !isOver14 || !acceptPrivacyPolicy) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Si se ha subido un avatar (imagen), almacenamos la ruta del archivo
        const avatarUrl = req.file ? req.file.path : null;

        // Comprobamos si ya existe un usuario con el mismo email o username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El username o email ya están registrados.' });
        }

        // Encriptamos la contraseña antes de almacenarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creamos un nuevo usuario con los datos proporcionados
        const newUser = new User({
            name,
            lastname,
            username,
            email,
            password: hashedPassword,
            dateBirth,
            country,
            acceptTerms,
            isOver14,
            acceptPrivacyPolicy,
            avatar: avatarUrl,
        });

        // Guardamos el usuario en la base de datos
        await newUser.save();

        // Generamos un token de verificación de correo que caduca en 1 hora
        const verificationToken = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Creamos un enlace de verificación que será enviado al correo del usuario
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${encodeURIComponent(verificationToken)}`;
        await sendVerificationEmail(email, verificationLink); // Enviamos el correo de verificación

        // Respondemos con un mensaje exitoso
        res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu correo electrónico.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Ocurrió un error durante el registro.' });
    }
};

// Verificación de correo electrónico
export const verifyEmail = async (req, res) => {
    const { token } = req.query; // Obtenemos el token desde los parámetros de la URL

    try {
        // Verificamos y decodificamos el token usando el secreto de la app
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Buscamos al usuario usando el email decodificado del token
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Si el usuario ya ha verificado su correo, respondemos con un error
        if (user.isVerified) {
            return res.status(400).json({ message: 'El correo ya ha sido verificado.' });
        }

        // Marcamos al usuario como verificado
        user.isVerified = true;
        await user.save();

        // Respondemos con un mensaje de éxito
        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error verificando el token:', error);

        // Si el token ha expirado, respondemos con un mensaje de error adecuado
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token expirado.' });
        }
        // Si el token es inválido o malformado, respondemos con otro error
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Token inválido o malformado.' });
        }

        // En otros casos de error, respondemos con un error genérico
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};

// Login de usuario
export const loginUser = async (req, res) => {
    const { username, password } = req.body; // Obtenemos los datos del formulario de login

    try {
        // Buscamos al usuario por su username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        // Comparamos la contraseña proporcionada con la almacenada (que está encriptada)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        // Si la autenticación es correcta, generamos un token JWT con los datos del usuario
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1d', // El token expirará en 1 día
        });

        // Respondemos con el token y la información básica del usuario
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                country: user.country,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error durante el inicio de sesión.' });
    }
};

// Generación de un token
export const generateToken = (user) => {
    try {
        // Generamos un token JWT para un usuario específico con una expiración de 1 hora
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        console.error('Error al generar el token:', error);
        throw new Error('Error al generar el token');
    }
};

// Función para obtener la información del usuario autenticado
export const getUserInfo = async (req, res) => {
    try {
        // Verificamos si el usuario está autenticado
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        // Buscamos al usuario en la base de datos por su ID
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Respondemos con la información del usuario
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        });
    } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
        res.status(500).json({ message: 'Error al obtener la información del usuario' });
    }
};

// Obtener todos los usuarios

export const getUsers = async (req, res) => {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }

// Actualización de la información del usuario
export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; // ID del usuario autenticado
        const updates = req.body; // Nuevos datos enviados en el cuerpo de la solicitud
        const file = req.file; // Archivo de avatar (si se ha subido uno)

        // Buscamos al usuario en la base de datos por su ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Si se ha subido un avatar, se debe enviar la URL desde Cloudinary
        if (file) {
            // Si el avatar anterior existe, se podría eliminar de Cloudinary para evitar almacenamiento innecesario
            if (user.avatar) {
                const publicId = user.avatar.split('/').pop().split('.')[0]; // Extraemos el ID público de la URL de Cloudinary
                await cloudinary.uploader.destroy(publicId); // Eliminamos el avatar antiguo
            }

            // Actualizamos la URL del nuevo avatar con la URL obtenida desde Cloudinary
            user.avatar = file.path; // Cloudinary nos devuelve una URL
        }

        // Actualizamos otros campos del usuario
        for (const key in updates) {
            if (key === 'password') {
                // Si se está actualizando la contraseña, la encriptamos
                user.password = await bcrypt.hash(updates[key], 10);
            } else if (user[key] !== undefined) {
                // Actualizamos otros campos si existen en el modelo
                user[key] = updates[key];
            }
        }

        // Guardamos los cambios realizados
        await user.save();

        // Respondemos con los datos actualizados del usuario
        res.status(200).json({
            message: 'Usuario actualizado exitosamente.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                name: user.name,
                lastname: user.lastname,
                country: user.country,
            },
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
};