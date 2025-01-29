import jwt from 'jsonwebtoken';

/**
 * Middleware para autenticar JWT (JSON Web Token).
 * 
 * Verifica si existe un token en la cabecera Authorization y valida su autenticidad.
 * Si el token es válido, se agrega la información decodificada del usuario al objeto `req`.
 * Si es inválido o no se proporciona, devuelve una respuesta de error.
 */
export const authenticateJWT = (req, res, next) => {
  /**
   * Extracción del token desde la cabecera Authorization.
   * El formato esperado es: "Bearer <token>".
   */
  const token = req.header('Authorization')?.split(' ')[1];

  // Si no se proporciona un token, responde con un error 401 (No autorizado)
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    /**
     * Verificación del token usando la clave secreta definida en las variables de entorno.
     * Si el token es válido, `decoded` contiene la información codificada (payload).
     */
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Almacena la información del usuario decodificada en `req.user`
    req.user = decoded;

    // Pasa el control al siguiente middleware
    next();
  } catch (err) {
    console.error('Token inválido:', err);

    // Si la verificación falla, responde con un error 403 (Prohibido)
    res.status(403).json({ message: 'Token inválido o expirado.' });
  }
};
