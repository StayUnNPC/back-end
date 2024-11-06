// 사용자 모델 파일
import db from '../config/database.js'; // ES 모듈 방식으로 가져오기
import bcrypt from 'bcryptjs';

const User = {
  // 사용자를 데이터베이스에 삽입하는 함수
  create: async (username, email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10); // 비밀번호 해시화
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    return db.promise().query(query, [username, email, hashedPassword]);
  },

  // 사용자를 이메일로 찾는 함수
  findByEmail: (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    return db.promise().query(query, [email]);
  }
};

export default User; // 기본 내보내기 추가
