import express from 'express';

import connectDB from '../BACKEND/lib/connectDB.js'; // Import the connectDB function

// -- WE CAN IMPORT THE USER ROUTE HERE --  {WE CAN GIVE ANY NAME TO THE ROUTE --> LIKE userRoute }
import userRoute from './routes/user.route.js';
import commentRoute from './routes/comment.route.js'; // Assuming you have comment.route.js
import postRoute from './routes/post.route.js'; // Assuming you have post.route.js
import webhookRoute from './routes/webhook.route.js';
import {ClerkExpressWithAuth }  from "@clerk/clerk-sdk-node";
// In your index.js or app.js

import savedRoute from './routes/saved.route.js';

import cors from "cors" ; 


const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));


app.use('/webhooks', webhookRoute);

app.use(express.json({ limit: '5mb' })); // middleware to parse incoming JSON with 5MB limit

app.use(ClerkExpressWithAuth());

app.use('/users', userRoute);
app.use('/comments', commentRoute); 
app.use('/posts', postRoute); // Assuming you have anotherRoute defined
app.use("/api/users", userRoute); 
app.use('/saved', savedRoute);

//Middleware to handle errors 
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || "Something went Wrong!" ,
        status: error.status , 
        stack: error.stack , 
    }); 
});

app.listen(3000, () => {
    connectDB(); // Connect to MongoDB
    console.log('Server is running on port 3000');
});
