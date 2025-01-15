import Community from '../models/community.model.js';
import Event from '../models/event.model.js';
import Team from '../models/team.model.js';
import User from '../models/user.model.js';

export const searchHandler = async (req, res) => {
    const { query, types } = req.query;
    const searchTypes = types ? types.split(',') : ['communities', 'events', 'teams', 'users'];

    const searchResults = {};
    const regex = new RegExp(query, 'i'); // Búsqueda insensible a mayúsculas/minúsculas

    try {
        if (searchTypes.includes('communities')) {
            searchResults.communities = await Community.find({ name: regex }).select('name coverPhoto type createdAt');
        }
        if (searchTypes.includes('events')) {
            searchResults.events = await Event.find({ name: regex }).select('name coverPhoto platform createdAt');
        }
        if (searchTypes.includes('teams')) {
            searchResults.teams = await Team.find({ name: regex }).select('name coverPhoto');
        }
        if (searchTypes.includes('users')) {
            searchResults.users = await User.find({ name: regex }).select('email avatar username');
        }

        res.status(200).json(searchResults);
    } catch (error) {
        res.status(500).json({ message: 'Error en la búsqueda', error });
    }
};