// Importamos mongoose para interactuar con la base de datos MongoDB
import mongoose from 'mongoose';

// Definición del esquema de usuario (UserSchema) utilizando mongoose
const UserSchema = new mongoose.Schema({
    // Campo para el nombre del usuario
    name: {
        type: String,
        required: false,
        trim: true, // Elimina espacios en blanco al inicio y al final
    },

    // Campo para el apellido del usuario
    lastname: {
        type: String,
        required: false, // Obligatorio
        trim: true, // Elimina espacios en blanco al inicio y al final
    },

    // Campo para el nombre de usuario
    username: {
        type: String,
        required: true, // Obligatorio
        unique: true, // Debe ser único
        trim: true, // Elimina espacios en blanco
    },

    // Campo para almacenar el correo electrónico del usuario
    email: {
        type: String,
        required: true, // Obligatorio
        unique: true, // Debe ser único
        lowercase: true, // Convierte el correo a minúsculas automáticamente
        trim: true, // Elimina los espacios al principio y al final
    },

    // Campo para la contraseña
    password: { 
        type: String,
        required: false, // Obligatoria
        minlength: 8, // Longitud mínima
    },

    // Campo para la fecha de nacimiento
    dateBirth: {
        type: Date,
        required: true, // Obligatoria
    },

    // Campo para el país del usuario
    country: {
        type: String,
        required: false, // Obligatorio
    },

    // Campos para las políticas y términos aceptados
    acceptTerms: {
        type: Boolean,
        required: true, // Obligatorio
    },

    isOver14: {
        type: Boolean,
        required: true, // Obligatorio
    },

    acceptPrivacyPolicy: {
        type: Boolean,
        required: true, // Obligatorio
    },

    // Campo para almacenar el avatar del usuario
    avatar: {
        type: String, // Ruta al archivo de imagen
        default: '',
    },

    // Campo para indicar si el usuario ha verificado su correo electrónico
    isVerified: {
        type: Boolean,
        default: false, // Valor predeterminado: no verificado
    },

    // NUEVO CAMPO PARA EL DISCORD ID
    discordId: {
        type: String,
        unique: true,  // Asegura que el discordId sea único
        sparse: true,  // Permite que sea opcional si el usuario no inicia sesión con Discord
    },

}, { timestamps: true }); // La opción `timestamps` agrega los campos `createdAt` y `updatedAt` automáticamente

// Exportamos el modelo de usuario
export default mongoose.model('User', UserSchema);
