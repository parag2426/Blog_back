// Import the Webhook verification tool from svix (used by Clerk)
import { Webhook } from "svix";
// Import your MongoDB models
import User from "../models/user.models.js";
import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";






const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;


// Controller function for Clerk webhook events
export const clerkWebHook = async (req, res) => {
  console.log("Webhook called", req.body)
  // Clerk webhook secret (used to verify if the request is really from Clerk)
  console.log("Webhook secrent",WEBHOOK_SECRET);


  // Step 1: Get raw request body (must be parsed as raw buffer in middleware)
  const payload = req.body;

  // Step 2: Get request headers (contains the signature for verification)
  const headers = req.headers;

  // Step 3: Create a new Webhook instance using Clerk's secret
  const wh = new Webhook(WEBHOOK_SECRET);

  console.log("Checkpoint 1")

  let evt;
  try {
    // Step 4: Verify the webhook signature
    // ✅ This ensures the request is really from Clerk and not someone faking it
    evt = wh.verify(payload, headers); // returns parsed JSON object if valid
  console.log("Checkpoint 2.1")

  } catch (err) {
    // Step 5: If verification fails, log and respond with error
  console.log("Checkpoint 2.2")

    console.error("❌ Webhook verification failed:", err);
    return res.status(400).json({ error: "Invalid webhook" });
  }

  // Step 6: Handle the user.created event

  console.log("checkpoint 3",evt)
  if (evt.type === "user.created") {
  console.log("checkpoint 4")

    // Create a new user in MongoDB
    const newUser = new User({
      clerkUserId: evt.data.id, // unique Clerk user ID
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url, // profile picture URL
    });

    // Save the user to the database
    const result= await newUser.save();
    console.log("User creation result",result)
  }

  // Step 7: Handle the user.deleted event
  if (evt.type === "user.deleted") {
    // First, find and delete the user by Clerk ID
    const deletedUser = await User.findOneAndDelete({
      clerkUserId: evt.data.id,
    });

    // If user existed and was deleted
    if (deletedUser) {
      // Delete all posts by the user
      await Post.deleteMany({ user: deletedUser._id });

      // Delete all comments by the user
      await Comment.deleteMany({ user: deletedUser._id });
    }
  }

  // Step 8: Send a success response back to Clerk
  return res.status(200).json({ message: "Webhook received" });
};

