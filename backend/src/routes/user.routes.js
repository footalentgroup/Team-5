import express from 'express'; 
import { registerUser, verifyEmail, loginUser, getUserInfo, updateUserInfo } from '../controllers/auth.controller.js'; 
import avatarUpload from '../middlewares/avatar.middleware.js'; 
import { authenticateJWT } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/register', avatarUpload.single('avatar'), registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.put('/update', authenticateJWT, avatarUpload.single('avatar'), updateUserInfo);
router.get('/user', authenticateJWT, getUserInfo);

export default router;
