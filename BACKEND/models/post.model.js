import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    }, 
    img: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        default: "general" , 
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    isfeatured: {     /// This field indicates if the post is featured
        type: Boolean,
        default: false,
    },
    visit: {
        type: Number,
        default: 0, // Default visit count is 0
    },
}, 
{ timestamps: true });

export default mongoose.model('Post', postSchema);
