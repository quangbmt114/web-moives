import { MongoClient } from 'mongodb';
import { createToken } from '../../auth/auth';


export default async function handler(req, res) {
  const client = await MongoClient.connect(
        "mongodb+srv://quangnv1509:nDtWtSINkSZbxbEP@dhome.qvvod45.mongodb.net/web_movies?retryWrites=true&w=majority"
      );
      const db = client.db();
      const data = db.collection("movies")
      const result = await data.find({}).toArray(); // Lấy tất cả dữ liệu từ cơ sở dữ liệu
  if (req.method === 'POST') {
    // Xử lý đăng nhập tại đây, kiểm tra thông tin người dùng, mật khẩu, v.v.
    result.map((item)=>{
      if(req.body.username===item.username&&req.body.password===item.password){
        // Nếu đăng nhập thành công, tạo token và gửi lại trong phản hồi
        
     const userId = item; // Thay thế bằng ID người dùng thực tế
     const token = createToken(userId);
     res.status(200).json({ token ,userId});
 
     }
    })
    

  } else {
    res.status(405).end(); // Phương thức không được hỗ trợ
  }
}