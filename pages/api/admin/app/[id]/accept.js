/**
 * Route URL: /api/admin/app/[id]/accept
 *
 * [PUT] - Accept an application
 *
 */

import Application from "../../../../../models/Application";
import dbConnect from "../../../../../utils/mongodb";
import { isAuthenticated } from "../../../../../utils/isAuthenticated";

export default async function handler(req, res) {
  /**
   * [PUT] - Accept an application
   *
   * @query_param {string} Application id
   * @return {object} 200 - Application data
   * @return {string} 400 - Error
   */

  if (req.method === "PUT") {
    // Destructure id
    const {
      query: { id },
    } = req;

    // Check if user is admin
    let isCorrectUser = await isAuthenticated(req, "ADMIN");
    if (!isCorrectUser) {
      return res.status(401).send("not authenticated");
    }

    await dbConnect();

    // Find application and update status to 'ACCEPTED'
    try {
      let data = await Application.findOneAndUpdate(
        { _id: id },
        {
          status: "ACCEPTED",
        }
      ).lean();
      await res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else {
    res.status(404).send("Error");
  }
}
