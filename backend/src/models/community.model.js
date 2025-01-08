import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    coverPhoto: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Pública', 'Privada'], // Ajusta según tus necesidades
        required: true,
    },
    interests: {
        type: [String],
        required: true,
    },
    rules: {
        type: String,
        required: true,
    },
    socialLinks: {
        discord: String,
        youtube: String,
        instagram: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscribers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });

export default mongoose.model('Community', communitySchema);
