import jwt from 'jsonwebtoken';

/**
 * Función para generar un token JWT para un usuario.
 * 
 * - Toma como entrada un objeto de usuario, que debe contener al menos `id` y `username`.
 * - Usa `jsonwebtoken` para firmar un JWT con los datos del usuario.
 * - El token tiene una duración de 1 hora.
 * 
 * @param {Object} user - El usuario para el que se generará el token.
 * @returns {string} - El token JWT generado.
 * @throws {Error} - Si ocurre un error al generar el token, lanza una excepción.
 */
export const generateToken = (user) => {
    try {
        // Se firma un token con los datos del usuario (id y username) y una clave secreta.
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
        // Si ocurre un error, se loguea el problema y se lanza una excepción.
        console.error('Error al generar el token JWT para el usuario:', user.username, error);
        throw new Error('Error al generar el token');
    }
};
