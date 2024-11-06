import dotenv from 'dotenv'; // dotenv 모듈을 불러옵니다.
//import mysql from 'mysql2'; // mysql2 모듈을 불러옵니다.
import mysql from 'mysql2/promise'; // 'mysql2/promise'로 변경

dotenv.config(); // .env 파일을 로드하여 환경 변수를 추가합니다.

// MySQL 데이터베이스 연결 객체를 생성합니다.
const db = mysql.createPool({
  host: process.env.DB_HOST,       // MySQL 서버의 호스트
  user: process.env.DB_USER,       // MySQL 사용자 이름
  password: process.env.DB_PASSWORD, // MySQL 사용자 비밀번호
  database: process.env.DB_NAME,   // 사용할 데이터베이스 이름
  waitForConnections: true,
  connectionLimit: 10,             // 최대 연결 수
  queueLimit: 0
});

// // MySQL 데이터베이스에 연결을 시도합니다.
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err.message);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

// 연결 확인을 위한 테스트 쿼리
db.query('SELECT 1')
  .then(() => console.log('Connected to MySQL database'))
  .catch(err => console.error('Error connecting to MySQL:', err.message));

export default db; // 기본 내보내기 추가
