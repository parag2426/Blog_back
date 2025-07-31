import express from 'express';
import { getPosts , getPost , createPost , deletePost , uploadAuth , toggleLikePost} from '../controllers/post.controller.js';
import { authenticateUser , requireAuth } from "../middlewares/auth.js";

const router = express.Router();


// --- Yaha database mai store that vha sai aaega mamla----
// router.get('/', async (req, res) => { 
//     const posts = await Post.find()
//     res.status(200).send(posts);
// });

router.get("/upload-auth" ,uploadAuth)

router.get('/', getPosts);
router.get('/:slug',getPost );
// router.post('/', createPost)

router.delete("/:id" ,deletePost )

router.post("/", authenticateUser, createPost);

// Toggle Like
router.post('/like/:postId', authenticateUser, toggleLikePost);





export default router   