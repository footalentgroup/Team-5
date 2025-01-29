import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

/**
 * Configuración del transporte de correo utilizando nodemailer
 * para el envío de correos electrónicos a través del servicio de Gmail.
 */
const transporter = nodemailer.createTransport({
    service: 'gmail', // Servicio de correo electrónico (Gmail en este caso)
    host: process.env.EMAIL_HOST, // Host de correo (definido en las variables de entorno)
    port: process.env.EMAIL_PORT, // Puerto de conexión (definido en las variables de entorno)
    secure: true, // true para puerto 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER, // Dirección de correo desde la cual se enviarán los emails
        pass: process.env.EMAIL_PASS, // Contraseña de aplicación (no contraseña del correo personal, contraseña generada para la aplicación)
    }
});

/**
 * Verificar la conexión con Gmail para confirmar que la configuración es correcta.
 */
transporter.verify((error, success) => {
    if (error) {
        console.error('Error de conexión con Gmail:', error);
    } else {
        console.log('Conexión con Gmail exitosa');
    }
});

/**
 * Función para enviar un correo de verificación al usuario
 * con un enlace para validar su dirección de correo electrónico.
 *
 * @param {string} email - Dirección de correo del destinatario.
 * @param {string} verificationLink - Enlace de verificación para confirmar el correo.
 */
export const sendVerificationEmail = async (email, verificationLink) => {
    // Configuración del contenido del correo
    const mailOptions = {
        from: process.env.EMAIL_USER, // Remitente del correo
        to: email, // Destinatario del correo
        subject: 'Verificación de correo Respawn Events', // Asunto del correo
        html: `<p>Haz clic <a href="${verificationLink}">aquí</a> para verificar tu dirección de correo electrónico.</p>`, // Contenido en formato HTML
    };

    try {
        // Envío del correo utilizando nodemailer
        await transporter.sendMail(mailOptions);
        console.log('Correo de verificación enviado exitosamente');
    } catch (error) {
        // Manejo de errores durante el envío del correo
        console.error('Error al enviar el correo de verificación:', error);
        console.error('Detalles del error:', error.stack); // Información detallada del error
    }
};
