import { auth, clerkClient } from "@clerk/express"; 
import User from "../models/user.model.js";

export const loginUser = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    // ✅ Step 1: Check if user exists in DB
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // ✅ Step 2: Fetch user info from Clerk (with full data)
      const clerkUser = await clerkClient.users.getUser(userId);

      const newUser = await User.create({
        clerkId: clerkUser.id,
        username: clerkUser.username || clerkUser.firstName + clerkUser.lastName, // fallback
        email: clerkUser.emailAddresses[0].emailAddress,
        photo: clerkUser.imageUrl,
      });

      return res.status(201).json(newUser);
    }

    // ✅ Step 3: User exists, return user data
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
