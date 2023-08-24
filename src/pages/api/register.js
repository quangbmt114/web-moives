
import { MongoClient } from 'mongodb';
export default async function handler(req, res) {
  if (req.method === "POST") {
    const getForm = req.body;
    const client = await MongoClient.connect(
        "mongodb+srv://quangnv1509:nDtWtSINkSZbxbEP@dhome.qvvod45.mongodb.net/web_movies?retryWrites=true&w=majority"
      );
      const db = client.db();
      const data = db.collection("movies");
      const result = await data.insertOne(getForm);
      res.status(200).json({ message: "Request processed successfully" });
      console.log(result);
      client.close();
  }
  
}
