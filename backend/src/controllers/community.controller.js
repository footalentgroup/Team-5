import Community from '../models/community.model.js';

// Crear comunidades
export const createCommunity = async (req, res) => {
    try {
        // Desestructuración de los datos de la solicitud (nombre, descripción, tipo, intereses, reglas y enlaces sociales)
        const { name, description, type, interests, rules, socialLinks } = req.body;

        // Verificar si el usuario está autenticado (si no, retorna un error 401)
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para crear una comunidad.' });
        }

        // Verificar si se ha subido una foto de portada. Si no se ha subido, se responde con un error 400
        const coverPhotoUrl = req.file?.path;  // Se espera que la imagen de la portada esté en `req.file.path`
        if (!coverPhotoUrl) {
            return res.status(400).json({ message: 'La foto de portada es obligatoria.' });
        }

        // Crear una nueva instancia del modelo Community con los datos proporcionados
        const community = new Community({
            coverPhoto: coverPhotoUrl,  // Foto de portada
            name,                       // Nombre de la comunidad
            description,                // Descripción de la comunidad
            type,                       // Tipo de comunidad (público, privado, etc.)
            interests: JSON.parse(interests), // Los intereses son un string JSON que se convierte en un array
            rules,                      // Reglas de la comunidad
            socialLinks: socialLinks ? JSON.parse(socialLinks) : {}, // Enlaces sociales (si existen)
            createdBy: req.user.id,     // ID del usuario que crea la comunidad (tomado del usuario autenticado)
        });

        // Guardar la comunidad en la base de datos
        await community.save();

        // Enviar una respuesta de éxito con la comunidad creada
        res.status(201).json({ message: 'Comunidad creada exitosamente.', community });
    } catch (error) {
        console.error('Error al crear la comunidad:', error);
        // Responder con un error 500 si ocurre algún problema al crear la comunidad
        res.status(500).json({ message: 'Error al crear la comunidad.', error: error.message });
    }
};

// suscribirse a una comunidad
export const subscribeToCommunity = async (req, res) => {
    try {
        // Obtener el ID de la comunidad de los parámetros de la URL
        const { communityId } = req.params;

        // Verificar si el usuario está autenticado
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para suscribirte a una comunidad.' });
        }

        // Buscar la comunidad por su ID en la base de datos
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'La comunidad no existe.' });
        }

        // Verificar si el usuario ya está suscrito a la comunidad
        if (community.subscribers.includes(req.user.id)) {
            return res.status(400).json({ message: 'Ya estás suscrito a esta comunidad.' });
        }

        // Agregar el ID del usuario a la lista de suscriptores de la comunidad
        community.subscribers.push(req.user.id);
        // Guardar la comunidad actualizada en la base de datos
        await community.save();

        // Enviar una respuesta de éxito
        res.status(200).json({ message: 'Te has suscrito a la comunidad exitosamente.', community });
    } catch (error) {
        console.error('Error al suscribirse a la comunidad:', error);
        // Enviar una respuesta con el error en caso de fallo
        res.status(500).json({ message: 'Error al suscribirse a la comunidad.', error: error.message });
    }
};
