import { verifyToken } from '../../auth/auth';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      const decoded = verifyToken(token);
      if (!decoded) {
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        res.status(200).json({ message: 'Authorized' });
      }
    }
  } else {
    res.status(405).end(); // Phương thức không được hỗ trợ
  }
}