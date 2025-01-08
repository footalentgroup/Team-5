import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import User from './models/user.model.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Función para generar una contraseña aleatoria
function generateRandomPassword(length = 12) {
    return crypto.randomBytes(length).toString('hex');
}

// Configuración de Passport para usar la estrategia de Discord
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
                // Buscar el usuario en la base de datos
                let user = await User.findOne({ discordId: profile.id });

                if (!user) {
                    // Crear un nuevo usuario con una contraseña aleatoria
                    const randomPassword = generateRandomPassword(12);

                    user = await User.create({
                        discordId: profile.id,
                        username: profile.username,
                        email: profile.email || null, // Cambiar a null si no hay email
                        avatar: profile.avatar || '',
                        password: randomPassword,
                        name: '',  // Completa según lo que necesites
                        lastname: '',
                        acceptTerms: true,
                        acceptPrivacyPolicy: true,
                        isOver14: true,
                        country: '',
                        dateBirth: new Date(),
                        isVerified: false,
                    });
                }

                // Llamar a done con el usuario encontrado o creado
                return done(null, user);
            } catch (error) {
                console.error('Error en la autenticación de Discord:', error); // Log de error
                return done(error, null);
            }
        }
    )
);

// Configuración para serializar el usuario
passport.serializeUser ((user, done) => {
    done(null, user.id); // Guardamos el ID del usuario en la sesión
});

// Configuración para deserializar el usuario
passport.deserializeUser (async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user); // Llamar a done con el usuario recuperado
    } catch (error) {
        console.error('Error al deserializar el usuario:', error); // Log de error
        done(error, null); // Pasar el error al callback
    }
});

// Exportar la instancia configurada de passport
export default passport;