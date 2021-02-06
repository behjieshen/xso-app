/**
 * Route URL: /api/admin/app/[id]
 *
 * [GET] - Get specific application
 * [DELETE] - Delete a specific application
 *
 */

import Application from "../../../../../models/Application";
import dbConnect from "../../../../../utils/mongodb";
import { isAuthenticated } from "../../../../../utils/isAuthenticated";

export default async function handler(req, res) {
  // Destructure id
  const {
    query: { id },
  } = req;

  // Check if user is admin
  let isCorrectUser = await isAuthenticated(req, "ADMIN");
  if (!isCorrectUser) {
    return res.status(401).send("not authenticated");
  }

  /**
   * [GET] - Get specific application
   *
   * @query_param {string} Application id
   * @return {object} 200 - Application data
   * @return {string} 400 - Error
   */

  if (req.method === "GET") {
    await dbConnect();

    // Get all data from MongoDB
    try {
      let data = await Application.findOne({ _id: id }).lean();
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }

    /**
     * [DELETE] - Delete a specific application
     *
     * @query_param {string} Application id
     * @return {string} 200 - Deleted Successfully
     * @return {string} 400 - Error
     */
  } else if (req.method === "DELETE") {
    await dbConnect();

    // Delete application
    try {
      await Application.findOneAndDelete({ _id: id }).lean();
      res.status(200).send("Deleted Successfully");
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
    }
  } else {
    res.status(400).send("Error");
  }
}
