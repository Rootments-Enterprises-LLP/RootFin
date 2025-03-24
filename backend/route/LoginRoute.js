import express from 'express';
import { Login, SignUp } from '../controllers/LoginAndSignup.js';

const router = express.Router();

router.post('/signin', SignUp).post('/login', Login)

export default router;
