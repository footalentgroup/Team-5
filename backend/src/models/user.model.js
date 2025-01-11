import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true, 
    },

    lastname: {
        type: String,
        required: false, 
        trim: true, 
    },

    username: {
        type: String,
        required: true, 
        unique: true, 
        trim: true, 
    },

    email: {
        type: String,
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
    },

    password: { 
        type: String,
        required: false,
        minlength: 8,
    },

    dateBirth: {
        type: Date,
        required: true, 
    },

    country: {
        type: String,
        required: false, 
    },

    acceptTerms: {
        type: Boolean,
        required: true, 
    },

    isOver14: {
        type: Boolean,
        required: true, 
    },

    acceptPrivacyPolicy: {
        type: Boolean,
        required: true, 
    },

    avatar: {
        type: String, 
        default: '',
    },

    isVerified: {
        type: Boolean,
        default: false, 
    },

    discordId: {
        type: String,
        unique: true,  
        sparse: true, 
    },

}, { timestamps: true }); 

export default mongoose.model('User', UserSchema);
