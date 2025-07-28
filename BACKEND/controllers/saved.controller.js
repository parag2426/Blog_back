import User from '../models/user.models.js';
import Post from '../models/post.model.js';

// Save post
export const savePost = async (req, res) => {
  const { postId } = req.params;
  const user = req.user;

  if (!user.savedPosts.includes(postId)) {
    user.savedPosts.push(postId);
    await user.save();
  }

  res.status(200).json({ message: 'Post saved successfully' });
};

// Unsave post
export const unsavePost = async (req, res) => {
  const { postId } = req.params;
  const user = req.user;

  user.savedPosts = user.savedPosts.filter(id => id !== postId);
  await user.save();

  res.status(200).json({ message: 'Post unsaved successfully' });
};

// Get all saved posts
export const getSavedPosts = async (req, res) => {
  const user = req.user;
  console.log("req.user---",user)

  try {
    const posts = await Post.find({ _id: { $in: user.savedPosts } }).populate("user", "username");
    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    res.status(500).json({ error: "Failed to load saved posts" });
  }
};
