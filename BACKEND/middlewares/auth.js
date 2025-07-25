import { clerkClient } from "@clerk/clerk-sdk-node";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const session = await clerkClient.sessions.verifySession(token);
    req.userId = session.userId; // ✅ Attach Clerk User ID to the request

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
