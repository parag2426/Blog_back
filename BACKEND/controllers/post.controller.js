import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.models.js";

// Get all posts with pagination
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  let matchStage = {};

  //
  if (cat) {
    matchStage.category = cat;
  }

  if (searchQuery) {
    matchStage.title = { $regex: searchQuery, $options: "i" };
  }

  if (featured) {
    matchStage.isFeatured = true;
  }

  if (sortQuery === "trending") {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    matchStage.createdAt = { $gte: oneWeekAgo };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");
    if (!user) {
      return res.status(404).json("No post found!");
    }
    matchStage.user = user._id;
  }

  let sortStage = { createdAt: -1 };
  switch (sortQuery) {
    case "oldest":
      sortStage = { createdAt: 1 };
      break;
    case "popular":
    case "trending":
      sortStage = { likesCount: -1 };
      break;
    case "newest":
    default:
      sortStage = { createdAt: -1 };
      break;
  }

  try {
    const aggregationPipeline = [
      { $match: matchStage },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likes", []] } },
        },
      },
      {
        $sort: sortStage,
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          img:1,
          desc:1,
          title: 1,
          content: 1,
          category: 1,
          likes: 1,
          likesCount: 1,
          createdAt: 1,
          updatedAt: 1,
          isFeatured: 1,
          user: {
            _id: 1,
            username: 1,
          },
        },
      },
    ];

    const posts = await Post.aggregate(aggregationPipeline);

    const totalPosts = await Post.countDocuments(matchStage);
    const hasMore = page * limit < totalPosts;

    res.status(200).json({ posts, hasMore });
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching posts" });
  }
};

// Get single post by slug
export const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "user",
      "username"
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    res
      .status(500)
      .json({ error: "Something went wrong while fetching the post" });
  }
};

// Create a new post
export const createPost = async (req, res) => {
  try {
    // ✅ Step 1: Get the post title from request body
    const title = req.body.title;

    // ✅ Step 2: Generate a base slug from the title (e.g., "My Post Title" -> "my-post-title")
    let baseSlug = title.trim().replace(/ /g, "-").toLowerCase();
    let slug = baseSlug;

    // ✅ Step 3: Check if a post with this slug already exists
    let existingPost = await Post.findOne({ slug });
    let counter = 2;

    // 🔁 If a post with the same slug exists, append a counter to make it unique
    while (existingPost) {
      slug = `${baseSlug}-${counter}`;
      existingPost = await Post.findOne({ slug });
      counter++;
    }

    // ✅ Step 4: Get the authenticated user from request
    // Clerk middleware (e.g., `requireAuth()`) should have added `req.user`
    const mongoUser = req.user;

    // ❌ Error Handling: Check if user is not present (unauthorized access)
    if (!mongoUser || !mongoUser._id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User not found while posting" });
    }

    // ✅ Step 5: Create a new Post object
    const newPost = new Post({
      ...req.body, // Spread the rest of the request body into the Post (e.g., content, category, etc.)
      slug, // Unique slug we just generated
      user: mongoUser._id, // Attach the logged-in user's ID
    });

    // 🪵 Log for debugging
    console.log("Trying to save post:", newPost);

    // ✅ Step 6: Save the new post to MongoDB
    const post = await newPost.save();

    // ✅ Step 7: Return the created post in response
    res.status(200).json(post);
  } catch (error) {
    // ❌ Catch and log any unexpected errors
    console.error("❌ Error creating post:", error.message);
    console.log("📝 Request body:", req.body);
    res
      .status(500)
      .json({ error: "Something went wrong while creating the post" });
  }
};

// const role = req.auth.sessionClaims?metadata?.role ||"user"
// if(role ==="admin")(
//   await Post.findByIdAndDelete(req.params.id)
//   res.status(200).json("Post has been deleted");
// )

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
    res
      .status(500)
      .json({ error: "Something went wrong while deleting the post" });
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
    res.json(result); // returns { signature, expire, token }
  } catch (error) {
    console.error("❌ Error getting ImageKit auth:", error);
    res
      .status(500)
      .json({ error: "Something went wrong with ImageKit authentication" });
  }
};

export const toggleLikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    // const userId = req.user._id; // Provided by requireAuth middleware
    const userId = req.auth?.userId;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated for likes" });
    }
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes.pull(userId); // Unlike
    } else {
      post.likes.push(userId); // Like
    }

    await post.save();

    return res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      totalLikes: post.likes.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
