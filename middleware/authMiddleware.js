// JWT 모듈을 가져옵니다.
const jwt = require('jsonwebtoken');

// verifyToken 미들웨어 함수 정의
// 클라이언트 요청에 포함된 JWT 토큰을 검증하고, 유효한 경우 다음 미들웨어로 진행합니다.
exports.verifyToken = (req, res, next) => {
  // 요청 헤더에서 Authorization 토큰을 가져옵니다.
  const token = req.headers['authorization'];
  
  // 토큰이 없는 경우, 403 상태 코드와 함께 오류 메시지를 반환합니다.
  if (!token) {
    return res.status(403).json({ message: 'Token is required.' });
  }

  // JWT 토큰을 검증합니다. (토큰, 비밀 키, 콜백 함수)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // 토큰이 유효하지 않거나 만료된 경우, 401 상태 코드와 함께 오류 메시지를 반환합니다.
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    
    // 토큰이 유효한 경우, 디코딩된 사용자 ID를 요청 객체(req)에 저장합니다.
    req.userId = decoded.id;

    // 다음 미들웨어 또는 라우트 핸들러로 요청을 전달합니다.
    next();
  });
};
