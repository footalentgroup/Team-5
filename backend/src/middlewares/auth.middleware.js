import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user; // Guardar la información del usuario en la solicitud
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};