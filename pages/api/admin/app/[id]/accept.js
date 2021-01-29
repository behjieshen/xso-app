import Application from "../../../../../models/Application";
import dbConnect from "../../../../../utils/mongodb";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const {
      query: { id },
    } = req;

    await dbConnect();

    // Get all data from MongoDB
    try {
      let data = await Application.findOneAndUpdate(
        { _id: id },
        {
          status: "ACCEPTED",
        }
      ).lean();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else {
  }
}
