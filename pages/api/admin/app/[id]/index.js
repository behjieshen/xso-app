import Application from "../../../../../models/Application";
import dbConnect from "../../../../../utils/mongodb";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  await dbConnect();

  if (req.method === "GET") {
    // Get all data from MongoDB
    try {
      let data = await Application.find({ _id: id }).lean();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else if (req.method === "DELETE") {
    // Delete
    try {
      let data = await Application.findOneAndDelete({ _id: id }).lean();
      res.status(200).send('Deleted Successfully');
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else {
    res.status(400).send("Error");
  }
}
