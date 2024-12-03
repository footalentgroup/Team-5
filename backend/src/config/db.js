import mongoose from 'mongoose';

const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.KEY_DB);
        console.log('Conexión exitosa a DB');
    } catch (error) {
        console.error('Conexión fallida a la DB:', error.message);
    }
};

export default mongoDB;
