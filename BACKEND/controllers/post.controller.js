import ImageKit from 'imagekit';
import Post from '../models/post.model.js';

export const getPosts = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const posts = await Post.find()
    .sort({ createdAt: -1 }) // Ensure consistent post order
    .populate("user", "username")
    .limit(limit)
    .skip((page - 1) * limit);  //*unit 

    const totalPosts = await Post.countDocuments();
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
    const post = await Post.findOne({ slug: req.params.slug }).populate("user" , "username");
    res.status(200).json(post) ; 
};

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

    const newPost = new Post({ ...req.body, slug });

    // ✅ Add this log to see what's being saved
    console.log("Trying to save post:", newPost);

    const post = await newPost.save();

    res.status(200).json(post);
  } catch (error) {
    // ✅ Log full error for debugging
    console.error("❌ Error creating post:", error.message);
    console.log("📝 Request body:", req.body);
    res.status(500).json({ error: "Something went wrong while creating the post" });
  }
};

export const deletePost = async (req, res) => {
    
    const post = await Post.findByIdAndDelete(req.params.id) ; 
    res.status(200).json("Post has been deleted") ;
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT, 
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
})

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result); // This should send { signature, expire, token }
};
