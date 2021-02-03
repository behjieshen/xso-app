/**
 * Route URL: /api/admin/export-applications
 *
 * [GET] - Download all applications data as csv
 *
 */

import { Application } from "../../../models/Application";
import dbConnect from "../../../utils/mongodb";
import { Parser } from "json2csv";
import moment from "moment";
import { isAuthenticated } from "../../../utils/isAuthenticated";

export default async function handler(req, res) {
  /**
   * [GET] - Download all applications data as csv
   *
   * @return {file} 200 - .csv file
   * @return {string} 404 - "Error"
   */
  if (req.method === "GET") {
    // Check if user is admin
    let isCorrectUser = await isAuthenticated(req, "ADMIN");
    if (!isCorrectUser) {
      return res.status(401)
    }

    await dbConnect();

    // Get all data from MongoDB
    let rawData = await Application.find().lean();
    let cleanedData = [];

    // Clean data
    rawData.forEach((application) => {
      // Destructure data
      const {
        fullName,
        email,
        location,
        education: { school, studentStatus, universityMajor },
        openQuestions,
        linkedinURL,
        resumeURL,
        youtubeIntroductionURL,
        otherComments,
        createdAt,
        status
      } = application;

      // Set custom column title in excel
      let cleanedApplication = {
        "Full Name": fullName,
        Email: email,
        Location: location,
        School: school,
        "Student Status": studentStatus,
        Major: universityMajor,
        "Linkedin URL": linkedinURL,
        "Resume URL": resumeURL,
        "Self-Introduction Youtube URL": youtubeIntroductionURL,
        "Other Comments": otherComments,
        "Submission Date": moment(createdAt).format("MMMM Do YYYY, hh:mm:ss Z"),
        "Application Status": status
      };

      // Add each set of open ended questions and answers
      openQuestions.forEach((openQuestion) => {
        const { answer, question } = openQuestion;
        cleanedApplication[question] = answer;
      });
      cleanedData.push(cleanedApplication);
    });

    // Parse Json to Csv
    const json2csvParser = new Parser({ header: true });
    const csvData = await json2csvParser.parse(cleanedData);

    // Send cav file back as attachment
    res.setHeader(
      "Content-Disposition",
      `attachment;filename=${moment().format("MMDDYYYY")}_XSO_APPLICATIONS.csv`
    );

    res.status(200).send(csvData);
  } else {
    res.status(404).send("Error");
  }
}
