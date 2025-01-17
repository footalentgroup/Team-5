import Team from '../models/team.model.js';
import User from '../models/user.model.js';

// Crear equipo 
export const createTeam = async (req, res) => {
    try {
        const { name, description, members, devices, instagram, games } = req.body;
        const coverPhotoUrl = req.file?.path; // Multer guarda la URL pública aquí

        // Validar campos obligatorios
        if (!name || !description || !members || !games) {
            return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados.' });
        }

        // Convertir miembros en un array y buscar sus IDs en la base de datos
        const memberUsernames = members.split(',');
        const memberIds = await Promise.all(
            memberUsernames.map(async (username) => {
                const user = await User.findOne({ username });
                if (!user) throw new Error(`El usuario ${username} no existe.`);
                return user._id;
            })
        );


        // const memberIds = await Promise.all(
        //     members.map(async (username) => {
        //         const user = await User.findOne({ username });
        //         if (!user) throw new Error(`El usuario ${username} no existe.`);
        //         return user._id;
        //     })
        // );


        // Crear el equipo
        const team = new Team({
            name,
            description,
            members: memberIds,
            devices,
            instagram,
            games: JSON.parse(games), // Parsear juegos si se envían como JSON
            coverPhoto: coverPhotoUrl,
            createdBy: req.user.id, // Usuario que crea el equipo
        });

        await team.save();
        res.status(201).json({ message: 'Equipo creado exitosamente.', team });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

    export const getTeams = async (req, res) => {
        try {
            const teams = await Team.find()
            res.status(200).json(teams)
        } catch (error) {
            res.json({
                message: error.message
            })
        }
    }