import User from '../models/User.js'; // ES 모듈 방식으로 가져오기
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// 회원가입 처리 함수
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const [existingUser] = await User.findByEmail(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    await User.create(username, email, password);
    res.status(201).json({ message: 'SUCCESS' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.' });
  }
};

// 로그인 처리 함수
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password ); //디버깅용

  try {
    const [rows] = await User.findByEmail(email);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'SUCCESS', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.' });
  }
};
