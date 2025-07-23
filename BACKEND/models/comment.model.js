import { Schema} from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        // required: true,
    }, 

    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post', // Reference to the User model
        required: true,
    }, 

    desc:{
        type: String ,
        required: true , 
    } , 
} , { timestamps: true });


export default mongoose.model('Comment', commentSchema); // Export the Comment model