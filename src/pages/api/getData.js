import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://quangnv1509:nDtWtSINkSZbxbEP@dhome.qvvod45.mongodb.net/web_movies?retryWrites=true&w=majority"
      );

      const db = client.db();
      const data = db.collection("movies");

      const result = await data.find({}).toArray(); // Lấy tất cả dữ liệu từ cơ sở dữ liệu
      console.log("Retrieved data:", result);

      client.close();

      res.status(200).json(result); // Trả về dữ liệu cho yêu cầu GET
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ message: "Error retrieving data" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  if (req.method === 'PUT') {
    try {
      const client = await MongoClient.connect(
        'mongodb+srv://quangnv1509:nDtWtSINkSZbxbEP@dhome.qvvod45.mongodb.net/web_movies?retryWrites=true&w=majority'
      );

      const db = client.db();
      const data = db.collection('movies');

      const id = req.body.id; // Lấy ID từ body của request
      const objectId = new ObjectId(id);

      // Dữ liệu mới để cập nhật
      const newData = {
        $set: {
          // Các trường dữ liệu muốn cập nhật
          title: req.body.title,
          genre: req.body.genre,
          // ...
        }
      };

      // Cập nhật dữ liệu dựa trên ID
      const result = await data.updateOne({ _id: objectId }, newData);
      console.log('Updated data:', result);

      client.close();

      res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
      console.error('Error updating data:', error);
      res.status(500).json({ message: 'Error updating data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
