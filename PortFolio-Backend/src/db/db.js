import mongoose from "mongoose";
import {DB_NAME} from "./constant.js"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected succesfully || HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection failed due to ${error} || Try again`)
    }
}

export default connectDB;