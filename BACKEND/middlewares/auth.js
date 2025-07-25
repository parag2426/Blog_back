// Importing Clerk backend SDK to access session verification methods
import { clerkClient } from "@clerk/clerk-sdk-node";

// Middleware function to authenticate user requests
export const authenticateUser = async (req, res, next) => {
  try {
    // Extracting the Authorization header from the request
    const authHeader = req.headers.authorization;

    // Splitting the header to get the token (format: "Bearer <token>")
    const token = authHeader && authHeader.split(" ")[1];

    // If no token is found, respond with 401 Unauthorized
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verifying the token using Clerk's session verification
    const session = await clerkClient.sessions.verifySession(token);

    // If verification succeeds, attach the user's Clerk ID to the request
    req.userId = session.userId;

    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log any errors for debugging
    console.error("Auth error:", error);

    // Send a 401 Unauthorized response if verification fails
    return res.status(401).json({ message: "Unauthorized" });
  }
};

