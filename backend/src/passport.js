import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from './models/user.model.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

/**
 * Función para generar una contraseña aleatoria.
 * 
 * Esta función genera una contraseña segura de longitud configurable (por defecto 12 caracteres).
 * La contraseña contiene caracteres alfanuméricos y símbolos especiales.
 * Se asegura de que la contraseña cumpla con los requisitos mínimos de seguridad.
 * 
 * @param {number} length - Longitud de la contraseña a generar (por defecto 12).
 * @returns {string} - La contraseña generada.
 */
function generateRandomPassword(length = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Asegúrate de que cumple con los requisitos de seguridad
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return generateRandomPassword(length); // Vuelve a generar si no cumple
    }

    return password;
}

/**
 * Función para verificar que el usuario tenga al menos 14 años.
 * 
 * Compara la fecha de nacimiento proporcionada con la fecha actual y valida que la edad sea mayor o igual a 14.
 * 
 * @param {Date} dateOfBirth - Fecha de nacimiento del usuario.
 * @returns {boolean} - `true` si el usuario tiene al menos 14 años, `false` en caso contrario.
 */
function isOver14(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    
    // Verifica si la edad es mayor o igual a 14
    return age > 14 || (age === 14 && month >= 0);
}

/**
 * Configuración de Passport para utilizar la estrategia de autenticación de Discord.
 * 
 * - Utiliza las credenciales de Discord para autenticar al usuario.
 * - Si el usuario no existe, lo crea en la base de datos con un correo electrónico y un nombre de usuario de Discord.
 * - Si el usuario ya existe, se retorna el usuario existente.
 * 
 * @param {string} accessToken - El token de acceso de Discord.
 * @param {string} refreshToken - El token de actualización de Discord.
 * @param {object} profile - El perfil de usuario de Discord.
 * @param {function} done - Función de callback para finalizar el proceso de autenticación.
 */
passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: process.env.DISCORD_CALLBACK_URL,
            scope: ['identify', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Verificar si el perfil tiene los campos necesarios
                if (!profile.email || !profile.username) {
                    return done(null, false, { message: 'El perfil de Discord no contiene los datos requeridos.' });
                }

                // Buscar el usuario en la base de datos por el email de Discord
                let user = await User.findOne({ email: profile.email });

                if (user) {
                    return done(null, user); // Si el usuario ya existe, lo retornamos
                }

                // Si no se proporciona la fecha de nacimiento, asignamos una fecha predeterminada
                let dateBirth = profile.dateOfBirth || new Date(2000, 0, 1); // Asigna una fecha predeterminada

                // Verificar si el usuario tiene al menos 14 años
                if (!isOver14(dateBirth)) {
                    return done(null, false, { message: 'Debes tener al menos 14 años.' });
                }

                const randomPassword = generateRandomPassword(12);

                // Crear un nuevo usuario con los datos de Discord
                user = await User.create({
                    discordId: profile.id,
                    username: profile.username,
                    email: profile.email,
                    avatar: profile.avatar || '',
                    password: randomPassword,
                    acceptTerms: true,
                    acceptPrivacyPolicy: true,
                    isOver14: true,
                    country: '',
                    dateBirth: dateBirth,
                    isVerified: false,
                });

                return done(null, user); // Finaliza el proceso de autenticación
            } catch (error) {
                console.error('Error en la autenticación de Discord:', error);
                return done(error, null); // Asegúrate de enviar el error completo
            }
        }
    )
);

/**
 * Serializa el usuario en la sesión.
 * 
 * - Almacena solo el `_id` del usuario en la sesión.
 * 
 * @param {Object} user - El usuario autenticado.
 * @param {function} done - Función de callback para finalizar el proceso de serialización.
 */
passport.serializeUser((user, done) => {
    done(null, user._id); // Usar _id en lugar de id
});

/**
 * Deserializa el usuario de la sesión.
 * 
 * - Recupera el usuario de la base de datos utilizando el `_id` almacenado en la sesión.
 * 
 * @param {string} id - El id del usuario almacenado en la sesión.
 * @param {function} done - Función de callback para finalizar el proceso de deserialización.
 */
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        console.error('Error al deserializar el usuario:', error);
        done(error, null);
    }
});

export default passport;
