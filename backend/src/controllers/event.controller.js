import Event from '../models/event.model.js';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';

// Crear un evento
export const createEvent = async (req, res) => {
    try {
        // Desestructuración de los datos enviados en la solicitud
        const {
            name, startDate, timezone, location, game, platform,
            participantsLimit, gameMode, teamSize, substitutes, format, rules,
            mustAcceptRules, participants, links, teamId,
        } = req.body;

        // Verificar si se ha subido una foto de portada, si no se proporciona, se asigna `null`
        const coverPhotoUrl = req.file?.path || null;

        // Verificar si el usuario está autenticado
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Debes estar autenticado para crear un evento.' });
        }

        // Verificar que el campo `teamId` esté presente y que el equipo exista
        if (!teamId) {
            return res.status(400).json({ message: 'Se requiere un ID de equipo para crear el evento.' });
        }

        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({ message: 'El equipo no existe.' });
        }

        // Validar que el campo `platform` no esté vacío
        if (!platform) {
            return res.status(400).json({ message: 'El campo platform es obligatorio.' });
        }

        // Procesar la lista de participantes (con usernames)
        let parsedParticipants = [];
        if (participants) {
            try {
                // Asegurar que `participants` sea un array válido
                const usernames = typeof participants === 'string' ? JSON.parse(participants) : participants;

                if (!Array.isArray(usernames)) {
                    throw new Error('El formato de participants es inválido.');
                }

                // Buscar los usuarios en la base de datos usando los nombres de usuario proporcionados
                const users = await User.find({ username: { $in: usernames } });
                parsedParticipants = users.map(user => user._id);

                // Verificar si se encontraron todos los usuarios, de lo contrario, se retorna un error
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

        // Crear un nuevo evento con los datos proporcionados
        const event = new Event({
            coverPhoto: coverPhotoUrl,  // Foto de portada del evento
            name,                       // Nombre del evento
            startDate,                  // Fecha de inicio del evento
            timezone,                   // Zona horaria del evento
            location,                   // Ubicación del evento
            game,                       // Juego que se jugará en el evento
            platform,                   // Plataforma del juego
            participantsLimit,          // Límite de participantes en el evento
            gameMode,                   // Modo de juego
            teamSize,                   // Tamaño del equipo
            substitutes,                // Sustitutos permitidos
            format,                     // Formato del evento (ej. torneo, liga)
            rules,                      // Reglas del evento
            mustAcceptRules,            // Si los participantes deben aceptar las reglas
            participants: parsedParticipants,  // Lista de participantes (usuarios)
            links: links ? JSON.parse(links) : {},  // Enlaces adicionales (si existen)
            createdBy: req.user.id,     // ID del usuario que crea el evento
            teamId,                     // ID del equipo relacionado al evento
        });

        // Guardar el evento en la base de datos
        await event.save();

        // Responder con éxito una vez que el evento ha sido creado
        res.status(201).json({ message: 'Evento creado exitosamente.', event });
    } catch (error) {
        console.error('Error al crear el evento:', error);
        // Enviar un mensaje de error si algo sale mal
        res.status(500).json({ message: 'Error al crear el evento.', error: error.message });
    }
};
