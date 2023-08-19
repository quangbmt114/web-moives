
import { createToken } from '../../auth/auth';


export default function handler(req, res) {
  if (req.method === 'POST') {
    // Xử lý đăng nhập tại đây, kiểm tra thông tin người dùng, mật khẩu, v.v.
    if(req.body.username==='admin'&&req.body.password==='admin'){
       // Nếu đăng nhập thành công, tạo token và gửi lại trong phản hồi
    const userId = 123; // Thay thế bằng ID người dùng thực tế
    const token = createToken(userId);
    res.status(200).json({ token });

    }

  } else {
    res.status(405).end(); // Phương thức không được hỗ trợ
  }
}