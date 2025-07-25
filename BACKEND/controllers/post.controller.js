import ImageKit from 'imagekit';
import Post from '../models/post.model.js';

// Get all posts with pagination
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("user", "username")
      .limit(limit)
      .skip((page - 1) * limit);

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({ error: "Something went wrong while fetching posts" });
  }
};

// Get single post by slug
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate("user", "username");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    res.status(500).json({ error: "Something went wrong while fetching the post" });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    const title = req.body.title;
    let baseSlug = title.trim().replace(/ /g, "-").toLowerCase();
    let slug = baseSlug;

    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    while (existingPost) {
      slug = `${baseSlug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    // ✅ Get user from authenticated session (Clerk middleware should add req.user)
    const mongoUser = req.user; // This is the correct source of the logged-in user

    if (!mongoUser || !mongoUser._id) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const newPost = new Post({
      ...req.body,
      slug,
      user: mongoUser._id, // Required field
    });

    console.log("Trying to save post:", newPost);

    const post = await newPost.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error creating post:", error.message);
    console.log("📝 Request body:", req.body);
    res.status(500).json({ error: "Something went wrong while creating the post" });
  }
};

// Delete post by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json("Post has been deleted");
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    res.status(500).json({ error: "Something went wrong while deleting the post" });
  }
};

// ImageKit configuration and authentication
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// Auth endpoint for ImageKit frontend
export const uploadAuth = async (req, res) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.send(result); // returns { signature, expire, token }
  } catch (error) {
    console.error("❌ Error getting ImageKit auth:", error);
    res.status(500).json({ error: "Something went wrong with ImageKit authentication" });
  }
};
