import mongoose from 'mongoose';

const createDatabaseConnection = async () => {
    global.mongooseConnection = mongoose.Connection;

    
    // const db = await mongoose.connect(process.env.DB_CONNECTION_STRING);
    mongoose.connection.on('close', () => {
        console.log(`Database connection closed`);
    });

    console.log(`Database connected`);

    return {
        // db,
        mongoose
    }
}

export default createDatabaseConnection;