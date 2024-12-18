import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión exitosa a DB');
    } catch (error) {
        console.error('Conexión fallida a la DB:', error.message);
        console.error(error);  // Imprime el objeto de error completo para más detalles
    }
};


export default mongoDB;
