import { getSession } from "next-auth/client";
import Application from "../../../models/Application";
import dbConnect from "../../../utils/mongodb";
import { Parser } from "json2csv";
import moment from "moment";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();

    try {
      let data = await Application.find().lean();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else {
  }
}
