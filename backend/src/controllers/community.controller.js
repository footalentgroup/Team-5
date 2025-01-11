import Community from '../models/community.model.js';

// Crear comunidades
export const createCommunity = async (req, res) => {
    try {
        const { name, description, type, interests, rules, socialLinks } = req.body;

        // Verificar autenticación
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para crear una comunidad.' });
        }

        // Verificar que se haya subido una imagen
        const coverPhotoUrl = req.file?.path;
        if (!coverPhotoUrl) {
            return res.status(400).json({ message: 'La foto de portada es obligatoria.' });
        }

        // Crear comunidad
        const community = new Community({
            coverPhoto: coverPhotoUrl,
            name,
            description,
            type,
            interests: JSON.parse(interests),
            rules,
            socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
            createdBy: req.user.id,
        });

        await community.save();

        res.status(201).json({ message: 'Comunidad creada exitosamente.', community });
    } catch (error) {
        console.error('Error al crear la comunidad:', error);
        res.status(500).json({ message: 'Error al crear la comunidad.', error: error.message });
    }
};

// suscribrise a una comunidad
export const subscribeToCommunity = async (req, res) => {
    try {
        const { communityId } = req.params;

        // Verificar autenticación
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para suscribirte a una comunidad.' });
        }

        // Buscar la comunidad
        const community = await Community.findById(communityId);
        if (!community) {
            return res.status(404).json({ message: 'La comunidad no existe.' });
        }

        // Verificar si el usuario ya está suscrito
        if (community.subscribers.includes(req.user.id)) {
            return res.status(400).json({ message: 'Ya estás suscrito a esta comunidad.' });
        }

        // Agregar al usuario a los suscriptores
        community.subscribers.push(req.user.id);
        await community.save();

        res.status(200).json({ message: 'Te has suscrito a la comunidad exitosamente.', community });
    } catch (error) {
        console.error('Error al suscribirse a la comunidad:', error);
        res.status(500).json({ message: 'Error al suscribirse a la comunidad.', error: error.message });
    }
};
