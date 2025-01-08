import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { sendVerificationEmail } from '../utils/email-verification.util.js';
import dotenv from 'dotenv';

dotenv.config();

// Registro de usuario
export const registerUser = async (req, res) => {
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

    if (!name || !lastname || !username || !email || !password || !dateBirth || !acceptTerms || !isOver14 || !acceptPrivacyPolicy) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const avatarUrl = req.file ? req.file.path : null;

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'El username o email ya están registrados.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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

        await newUser.save();

        const verificationToken = jwt.sign(
            { email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${encodeURIComponent(verificationToken)}`;
        await sendVerificationEmail(email, verificationLink);

        res.status(201).json({ message: 'Usuario registrado exitosamente. Verifica tu correo electrónico.' });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Ocurrió un error durante el registro.' });
    }
};

// Verificación de correo electrónico
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

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Correo verificado exitosamente.' });
    } catch (error) {
        console.error('Error verificando el token:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token expirado.' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: 'Token inválido o malformado.' });
        }

        res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};

// Login de usuario
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

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

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

export const generateToken = (user) => {
    try {
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        console.error('Error al generar el token:', error);
        throw new Error('Error al generar el token');
    }
};

// Función para obtener la información del usuario autenticado
export const getUserInfo = async (req, res) => {
    try {
        // Verificar que el usuario esté autenticado
        if (!req.user) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        // Buscar el usuario en la base de datos
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Devolver la información del usuario
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
