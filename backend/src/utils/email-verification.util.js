import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'gmail', // Usar el servicio de Gmail
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT, 
    secure: true, 
    auth: {
        user: process.env.EMAIL_USER, // Tu dirección de Gmail
        pass: process.env.EMAIL_PASS, // Tu contraseña de aplicación
    }
});

// Verificar la conexión con Gmail
transporter.verify((error, success) => {
    if (error) {
        console.error('Error de conexión con Gmail:', error);
    } else {
        console.log('Conexión con Gmail exitosa');
    }
});

// Enviar correo de verificación
export const sendVerificationEmail = async (email, verificationLink) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Dirección del remitente
        to: email, // Dirección del destinatario
        subject: 'Verificación de correo Respawn Events', // Línea de asunto
        html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado exitosamente');
    } catch (error) {
        console.error('Error al enviar el correo de verificación:', error);
        console.error('Detalles del error:', error.stack);
    }
};