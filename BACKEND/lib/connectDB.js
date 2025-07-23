import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)   //mongodb://127.0.0.1:27017/myapp --> We need to hide this so use .env
          console.log("Connected to the database successfully");
    } catch(err){
        console.log("Error connecting to the database:", err);
    }
}

export default connectDB; // Export the connectDB function