import { clerkClient } from "@clerk/express";
import User from "../models/user.models.js";

export const loginUser = async (req, res, next) => {
  try {
    const { userId } = req.auth;

    let user = await User.findOne({ clerkUserId: req.auth.userId });

    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);

      const newUser = await User.create({
        clerkUserId: clerkUser.id,
        username: clerkUser.username || clerkUser.firstName + clerkUser.lastName,
        email: clerkUser.emailAddresses[0].emailAddress,
        img: clerkUser.imageUrl,
      });

      return res.status(201).json(newUser);
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserSavedPosts = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId: clerkUserId });

  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const user = await User.findOne({ clerkUserId: clerkUserId });

  const isSaved = user.savedPosts.some((p) => p === postId);

  if (!isSaved) {
    await User.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await User.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }

  res.status(200).json(isSaved ? "Post unsaved" : "Post saved");
};

