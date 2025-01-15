import Community from '../models/community.model.js';
import Event from '../models/event.model.js';
import Team from '../models/team.model.js';

export const searchHandler = async (req, res) => {
    const { query, types } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'La consulta no puede estar vacía.' });
    }

    const filters = types ? types.split(',') : ['communities', 'events', 'teams'];

    try {
        const results = {};

        if (filters.includes('communities')) {
            results.communities = await Community.find({
                name: { $regex: query, $options: 'i' }
            });
        }

        if (filters.includes('events')) {
            results.events = await Event.find({
                name: { $regex: query, $options: 'i' }
            });
        }

        if (filters.includes('teams')) {
            results.teams = await Team.find({
                name: { $regex: query, $options: 'i' }
            });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};