import express from 'express';
import { register, login } from '../controllers/authController.js'; // 명명된 내보내기 사용
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router; // ES 모듈 방식으로 내보내기
