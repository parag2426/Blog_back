import User from "../models/user.models.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;


    if (!clerkUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const mongoUser = await User.findOne({ clerkUserId });

    if (!mongoUser) {
      return res.status(401).json({ error: "User not found in DB" });
    }

    req.user = mongoUser; // attach user to req
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(500).json({ error: "Authentication failed" });
  }
};




// middleware/auth.js
export const requireAuth = (req, res, next) => {
  const user = req.user; // Set from your auth provider (e.g., Clerk, Firebase)
  if (!user) return res.status(401).json({ message: 'Unauthorized' });
  next();
};
