import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendVerificationEmail } from '../utils/email-verification.util.js';

export const registerUser = async (req, res) => {
    const { name, lastname, username, email, password, dateBirth, country, acceptTerms, isOver14, acceptPrivacyPolicy } = req.body;

    try {
        const avatarUrl = req.file ? req.file.path : null;

        // Validar existencia de usuario antes del registro
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El username o email ya están registrados.' });
        }

        // Crear el usuario con los datos sin encriptar la contraseña manualmente
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

        // Guardar el usuario en la base de datos
        await newUser.save();

        // Generar token de verificación y enviar correo
        const verificationToken = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${encodeURIComponent(verificationToken)}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu correo electrónico.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);

        // Manejar errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }

        res.status(500).json({ message: 'Ocurrió un error durante el registro.' });
    }
};

export const verifyEmail = async (req, res) => {
    const { token } = req.query;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'El correo ya ha sido verificado.' });
        }

        const tokenCreationTime = decoded.iat * 1000; // Fecha de creación del token en milisegundos
        const currentTime = Date.now();
        const tokenAge = currentTime - tokenCreationTime;

        if (tokenAge > 24 * 60 * 60 * 1000) { // 24 horas
            return res.status(400).json({ message: 'El token de verificación ha expirado.' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error verificando el token:', error);
        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Username o contraseña incorrectos.' });
        }

        if (!user.isVerified) {
            return res.status(400).json({ message: 'El correo electrónico no ha sido verificado. Verifica tu correo para continuar.' });
        }

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

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Usuarios obtenidos exitosamente', users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const updates = req.body;
        const file = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }

        if (file) {
            if (user.avatar) {
                const publicId = user.avatar.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }

            user.avatar = file.path;
        }

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
