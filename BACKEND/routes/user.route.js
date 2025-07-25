// routes/user.route.js
import express from 'express';
import User from '../models/user.models.js';

import { getUserSavedPosts , savePost } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { clerkUserId, username, email, photo } = req.body;

    const existingUser = await User.findOne({ clerkUserId });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    const newUser = new User({ clerkUserId, username, email, photo });
    await newUser.save(); // 🔥 Important!

    return res.status(201).json({ message: 'User created', user: newUser });
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.get("/saved" , getUserSavedPosts)
router.patch("/save" , savePost)

export default router;
