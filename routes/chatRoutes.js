// routes/chatRoutes.js
import express from 'express';
import { handleChatRequest } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', handleChatRequest); // /api/chat 경로에 POST 요청 처리

export default router;
