import Community from '../models/community.model.js';
import Event from '../models/event.model.js';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';

// Manejador de búsqueda
export const searchHandler = async (req, res) => {
    // Extraer los parámetros de consulta (query y types)
    const { query, types } = req.query;

    // Si no se especifica el tipo de búsqueda, por defecto buscar en todos los tipos (comunidades, eventos, equipos, usuarios)
    const searchTypes = types ? types.split(',') : ['communities', 'events', 'teams', 'users'];

    // Inicializar un objeto para almacenar los resultados de la búsqueda
    const searchResults = {};

    // Crear una expresión regular para la búsqueda insensible a mayúsculas/minúsculas
    const regex = new RegExp(query, 'i'); 

    try {
        // Si 'communities' está incluido en los tipos de búsqueda, buscar en el modelo Community
        if (searchTypes.includes('communities')) {
            searchResults.communities = await Community.find({ name: regex })
                .select('name coverPhoto type createdAt'); // Seleccionar solo los campos necesarios
        }

        // Si 'events' está incluido en los tipos de búsqueda, buscar en el modelo Event
        if (searchTypes.includes('events')) {
            searchResults.events = await Event.find({ name: regex })
                .select('name coverPhoto platform createdAt'); // Seleccionar solo los campos necesarios
        }

        // Si 'teams' está incluido en los tipos de búsqueda, buscar en el modelo Team
        if (searchTypes.includes('teams')) {
            searchResults.teams = await Team.find({ name: regex })
                .select('name coverPhoto'); // Seleccionar solo los campos necesarios
        }

        // Si 'users' está incluido en los tipos de búsqueda, buscar en el modelo User
        if (searchTypes.includes('users')) {
            searchResults.users = await User.find({ name: regex })
                .select('email avatar username'); // Seleccionar solo los campos necesarios
        }

        // Responder con los resultados de la búsqueda
        res.status(200).json(searchResults);

    } catch (error) {
        // Si ocurre un error en el proceso de búsqueda, responder con el error
        res.status(500).json({ message: 'Error en la búsqueda', error });
    }
};
