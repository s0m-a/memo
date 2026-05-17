import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DB_DATABASE_URL;

class Dbstorage {
    async checklife() {
        try {
            await mongoose.connect(DATABASE_URL);
            console.log("Connection to the MongoDB database successful");
            return true;
        } catch (error) {
            console.error("Unable to connect to the database:", error);
            return false;
        }
    }

    // Close the database connection
    async close() {
        try {
            await mongoose.connection.close();
            console.log("Database connection closed.");
        } catch (error) {
            console.error("Error closing database connection:", error);
        }
    }
}

const dbStorage = new Dbstorage();
export default dbStorage;