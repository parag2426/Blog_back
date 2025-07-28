import express from 'express';
import { authenticateUser } from '../middlewares/auth.js';
import { savePost, unsavePost, getSavedPosts } from '../controllers/saved.controller.js';

const router = express.Router();

router.post('/:postId', authenticateUser, savePost);        // Save post
router.delete('/:postId', authenticateUser, unsavePost);    // Unsave post
router.get('/', authenticateUser, getSavedPosts);           // Get saved posts

export default router;
