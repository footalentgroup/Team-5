import bcrypt from 'bcrypt'; // Módulo para cifrar contraseñas
import jwt from 'jsonwebtoken'; // Módulo para manejo de tokens JWT
import User from '../models/user.model.js'; // Modelo de usuario
import { sendVerificationEmail } from '../utils/email-verification.util.js'; // Función para enviar correos de verificación

/**
 * Controlador para registrar un nuevo usuario.
 * - Valida la existencia previa del username o correo.
 * - Encripta la contraseña.
 * - Genera un token de verificación.
 * - Envía un correo con el link de verificación.
 */
export const registerUser = async (req, res) => {
    const { name, lastname, username, email, password, dateBirth, country, acceptTerms, isOver14, acceptPrivacyPolicy } = req.body;

    try {
        const avatarUrl = req.file ? req.file.path : null;

        // Verifica si ya existe un usuario con el mismo email o username
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El username o email ya están registrados.' });
        }

        // Creación del nuevo usuario
        const newUser = new User({
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
            avatar: avatarUrl,
        });

        // Guardado en la base de datos
        await newUser.save();

        // Generación de un token para verificación por correo
        const verificationToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${encodeURIComponent(verificationToken)}`;
        
        // Envío del correo de verificación
        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu correo electrónico.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Ocurrió un error durante el registro.' });
    }
};

/**
 * Controlador para verificar el correo del usuario.
 * - Decodifica el token de verificación.
 * - Valida la existencia del usuario.
 * - Verifica que el token no haya expirado.
 * - Actualiza el estado de verificación del usuario.
 */
export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'El token de verificación es necesario.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'El correo ya ha sido verificado.' });
        }

        // Valida la vigencia del token (24 horas)
        const tokenCreationTime = decoded.iat * 1000;
        const currentTime = Date.now();
        const tokenAge = currentTime - tokenCreationTime;

        if (tokenAge > 24 * 60 * 60 * 1000) {
            return res.status(400).json({ message: 'El token de verificación ha expirado.' });
        }

        // Marcar el correo como verificado
        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error verificando el token:', error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(400).json({ message: 'Token inválido.' });
        }

        res.status(500).json({ message: 'Error en el servidor, por favor intente nuevamente más tarde.' });
    }
};

/**
 * Controlador para el inicio de sesión del usuario.
 * - Verifica la existencia del usuario.
 * - Compara la contraseña ingresada con la almacenada.
 * - Genera un token JWT para autenticación.
 */
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        // Verificación de la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'El correo electrónico no ha sido verificado. Verifica tu correo para continuar.' });
        }

        // Generación del token JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error durante el inicio de sesión.',
        });
    }
};

/**
 * Obtiene la información del usuario autenticado.
 */
export const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

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

/**
 * Obtiene una lista de todos los usuarios.
 */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Usuarios obtenidos exitosamente', users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Actualiza la información del usuario autenticado.
 */
export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        const file = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        // Actualiza el avatar si existe un nuevo archivo
        if (file) {
            user.avatar = file.path;
        }

        // Actualiza los campos permitidos
        for (const key in updates) {
            if (key === 'password') {
                user.password = await bcrypt.hash(updates[key], 10);
            } else if (user[key] !== undefined) {
                user[key] = updates[key];
            }
        }

        await user.save();

        res.status(200).json({
            message: 'Usuario actualizado exitosamente.',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ message: 'Error al actualizar el usuario.' });
    }
};
