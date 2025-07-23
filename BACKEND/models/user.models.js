import {Schema } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema({
    clerkUserId: {
        type:String, 
        required: true, 
        unique: true,

    },
    username: {
        type:String , 
        required:true , 
        unique: true, 
    } , 
    email: {
        type:String , 
        required:true , 
        unique: true, 
    } , 
    img: {
        type:String , 
    } , 
    savedPosts:{
        type:[String] , // Array of post IDs
        default: [] ,
    }
} , {timestamps:true});


export default mongoose.model('User', userSchema); // Export the User model
// This will create a collection named 'users' in the database