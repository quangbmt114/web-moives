import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Thay thế bằng khóa bí mật thực tế

export const createToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};