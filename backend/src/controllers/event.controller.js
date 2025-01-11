import Event from '../models/event.model.js';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';

export const createEvent = async (req, res) => {
    try {
        const {
            name, startDate, timezone, location, game, platform,
            participantsLimit, gameMode, teamSize, substitutes, format, rules,
            mustAcceptRules, participants, links, teamId,
        } = req.body;

        const coverPhotoUrl = req.file?.path || null;

        // Verificar autenticación
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para crear un evento.' });
        }

        // Verificar que el equipo existe
        if (!teamId) {
            return res.status(400).json({ message: 'Se requiere un ID de equipo para crear el evento.' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'El equipo no existe.' });
        }

        // Validar que platform no esté vacío
        if (!platform) {
            return res.status(400).json({ message: 'El campo platform es obligatorio.' });
        }

        // Procesar participants (con usernames)
        let parsedParticipants = [];
        if (participants) {
            try {
                const usernames = typeof participants === 'string' ? JSON.parse(participants) : participants;

                if (!Array.isArray(usernames)) {
                    throw new Error('El formato de participants es inválido.');
                }

                // Buscar los ObjectId de los usuarios basados en los nombres de usuario
                const users = await User.find({ username: { $in: usernames } });
                parsedParticipants = users.map(user => user._id);

                // Validar si no se encontraron todos los usuarios
                if (parsedParticipants.length !== usernames.length) {
                    return res.status(400).json({
                        message: 'Algunos usuarios no existen en el sistema.',
                        missingUsers: usernames.filter(username => 
                            !users.some(user => user.username === username)),
                    });
                }
            } catch (error) {
                return res.status(400).json({ message: 'El formato de participants es inválido.' });
            }
        }

        // Crear el evento
        const event = new Event({
            coverPhoto: coverPhotoUrl,
            name,
            startDate,
            timezone,
            location,
            game,
            platform,
            participantsLimit,
            gameMode,
            teamSize,
            substitutes,
            format,
            rules,
            mustAcceptRules,
            participants: parsedParticipants,
            links: links ? JSON.parse(links) : {},
            createdBy: req.user.id,
            teamId,
        });

        await event.save();
        res.status(201).json({ message: 'Evento creado exitosamente.', event });
    } catch (error) {
        console.error('Error al crear el evento:', error);
        res.status(500).json({ message: 'Error al crear el evento.', error: error.message });
    }
};