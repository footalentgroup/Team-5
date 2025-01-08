import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    games: [
        {
          name: { type: String, required: true },
          genre: { type: String },
        }],
    devices: [String],
    instagram: { type: String },
    coverPhoto: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Team', TeamSchema);