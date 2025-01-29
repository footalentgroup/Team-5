import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * Definición del esquema de usuario para la colección en MongoDB.
 * Incluye validaciones personalizadas y campos relacionados con la autenticación.
 */
const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: false, trim: true },
        lastname: { type: String, required: false, trim: true },
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
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo válido'],
        },
        password: {
            type: String,
            required: false,
            validate: {
                /**
                 * Valida que la contraseña tenga al menos:
                 * - 8 caracteres
                 * - Una letra mayúscula
                 * - Una letra minúscula
                 * - Un número
                 * - Un carácter especial
                 */
                validator: function (v) {
                    if (this.isModified('password')) {
                        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
                    }
                    return true;
                },
                message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.',
            },
        },
        dateBirth: {
            type: Date,
            required: false,
            validate: {
                /**
                 * Valida que el usuario tenga al menos 14 años.
                 */
                validator: function (v) {
                    const age = new Date().getFullYear() - new Date(v).getFullYear();
                    return age >= 14;
                },
                message: 'Debes tener al menos 14 años.',
            },
        },
        country: { type: String, required: false },
        acceptTerms: { type: Boolean, required: true },
        isOver14: { type: Boolean, required: true },
        acceptPrivacyPolicy: { type: Boolean, required: true },
        avatar: {
            type: String,
            default: 'https://s3-alpha-sig.figma.com/img/8700/1041/9e5f5601c0d7438d4c0e20fa10cc740f?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kbp8P0KeA8oM5aV~ji0YCO7eUlUIv~odi3KeQwy-JThE7Wju6He8~qM7TPZ8M-oihwpzPThRxC9ywCnoYNs-x8nHNnpgrJ50lRGrPfSiSXQ9nKHiYiSKtWhI3qrJAExbymuEZnyTIf0PZW9wadNOn8lmL9rgDku8s7EFu788r~mZRyNTAg-6-hsSnCuyluc-5zIu5q-jlS2TQcAMCJ7EyPWH41-YLNw-Bl~DLSCST3oy2~~hL9WJoMjLey1yjNaQ0nXh9IIKTrauIbJtBXFcmy0SPEbnxJHzE5vnr4E6o0bdm2358-7~bmM14G55aBc0AgEmli8a7UT20jiw5yOrNA__',
        },
        isVerified: { type: Boolean, default: false },
        discordId: { type: String, unique: true, sparse: true },
    },
    { timestamps: true }
);

/**
 * Middleware para cifrar la contraseña antes de guardar un usuario.
 */
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        // Genera el hash de la contraseña con bcrypt
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Método de instancia para comparar una contraseña proporcionada
 * con el hash almacenado en la base de datos.
 *
 * @param {string} enteredPassword - Contraseña ingresada por el usuario.
 * @returns {boolean} Devuelve true si las contraseñas coinciden.
 */
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
