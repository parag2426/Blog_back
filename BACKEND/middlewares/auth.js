import { Clerk } from '@clerk/backend';  // new import
import User from "../models/user.models.js";

const clerk = Clerk({ apiKey: process.env.CLERK_SECRET_KEY }); // initialize Clerk with secret

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const session = await clerk.sessions.verifySession(token); // <-- fixed

    const clerkUserId = session.userId;
    const mongoUser = await User.findOne({ clerkId: clerkUserId });

    if (!mongoUser) {
      return res.status(401).json({ message: "User not registered in database" });
    }

    req.user = mongoUser;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized auth error." });
  }
};
