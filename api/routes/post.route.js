import express from 'express';
import { create, getposts,deletepost } from '../controllers/post.controller.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router()
router.post('/create', verifyToken, create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)


export default router;