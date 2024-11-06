import 'dotenv/config'; // .env 파일 로드
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; 
import cors from 'cors';
import path from 'path';

const app = express();

const corsOptions = {
  origin: 'http://your-frontend-domain.com', // 허용할 도메인 지정
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  credentials: true, // 쿠키 허용 여부 설정
};

app.use(cors());

app.use(express.json()); // JSON 요청 바디를 파싱
app.use('/api/auth', authRoutes); // 인증 라우트 사용
app.use('/api/chat', chatRoutes); // OpenAI API 호출을 위한 라우트 추가


app.use('/images', express.static(path.join(path.resolve(), 'image')));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
