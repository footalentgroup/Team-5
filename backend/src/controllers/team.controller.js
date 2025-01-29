import Team from '../models/team.model.js';
import User from '../models/user.model.js';

// Crear un equipo
export const createTeam = async (req, res) => {
    try {
        // Desestructuración de los datos enviados en la solicitud
        const { name, description, members, devices, instagram, games } = req.body;

        // Si se sube una foto de portada, se guarda la URL pública proporcionada por Multer
        const coverPhotoUrl = req.file?.path;

        // Validar si los campos obligatorios están presentes
        if (!name || !description || !members || !games) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
        }

        // Convertir los miembros enviados (como una cadena separada por comas) en un array y buscar sus IDs en la base de datos
        const memberUsernames = members.split(',');
        const memberIds = await Promise.all(
            memberUsernames.map(async (username) => {
                // Buscar al usuario por nombre de usuario
                const user = await User.findOne({ username });
                if (!user) throw new Error(`El usuario ${username} no existe.`); // Si no se encuentra al usuario, lanzar un error
                return user._id; // Retornar el ID del usuario
            })
        );

        // Crear el objeto del equipo utilizando los datos proporcionados
        const team = new Team({
            name,                       // Nombre del equipo
            description,                // Descripción del equipo
            members: memberIds,         // Lista de IDs de los miembros
            devices,                    // Dispositivos del equipo
            instagram,                  // Instagram del equipo (si existe)
            games: JSON.parse(games),   // Lista de juegos que juega el equipo (parseado desde JSON)
            coverPhoto: coverPhotoUrl,  // Foto de portada del equipo
            createdBy: req.user.id,     // Usuario que está creando el equipo
        });

        // Guardar el equipo en la base de datos
        await team.save();

        // Responder con un mensaje de éxito y el equipo creado
        res.status(201).json({ message: 'Equipo creado exitosamente.', team });
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los equipos
export const getTeams = async (req, res) => {
    try {
        // Buscar todos los equipos en la base de datos
        const teams = await Team.find();

        // Responder con los equipos encontrados
        res.status(200).json(teams);
    } catch (error) {
        // Manejar errores y responder con un mensaje de error
        res.json({
            message: error.message,
        });
    }
};
