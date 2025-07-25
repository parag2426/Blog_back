import Comment from "../models/comment.model.js"
import User from "../models/user.models.js"


export const getPostComments = async (req, res) => {

    const comments = await Comment.find({post: req.params.postId})
        .populate("user" , "username img")
        .sort({createdAt: -1}); 
    res.json(comments) ;
}; 


export const addComment = async (req, res) => {
  try {
    const clerkUserId = req.auth?.userId;
    const postId = req.params.postId;

    console.log("🧠 Clerk User ID:", clerkUserId);
    console.log("📝 Request Body:", req.body);

    if (!clerkUserId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ clerkUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      desc: req.body.desc,
      user: user._id,
      post: postId,
    });

    const savedComment = await newComment.save();
    
    setTimeout (()=>{
      res.status(201).json(savedComment);
    }, 3000) ; 

    
  } catch (err) {
    console.error("❌ Error in addComment:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const role = req.auth.sessionClaims?.metadata?.role || "user";
// if (role= "admin") {
// await Comment.findByIdAndDelete(req.params.id);
//  return res.status(200).json("Comment has been deleted");
// }

 

export const deleteComment = async (req, res) => {
    const clerkUserId = req.auth.userId;
    const id = req.params.id;

    if (!clerkUserId) {
        return res.status(401).json("Not authenticated");
    }

    const user = await User.findOne({ clerkUserId });
    const deletedComment = await Comment.findOneAndDelete({ _id: id, user: user._id });

    if (!deletedComment) {
        return res.status(403).json("You can delete only your comment!");
    }

    res.status(200).json("Comment deleted");
};
