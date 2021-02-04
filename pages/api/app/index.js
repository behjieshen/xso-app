/**
 * Route URL: /api/app
 *
 * [GET] - View completed application if user is logged in and has applied
 * [POST] - Submit new application
 *
 */

import { getSession } from "next-auth/client";
import { Application } from "../../../models/Application";
import { applicationSchema } from "../../../models/validationSchema";
import dbConnect from "../../../utils/mongodb";
import User from "../../../models/User";
import { isAuthenticated } from "../../../utils/isAuthenticated";

export default async function handler(req, res) {
  /**
   * [POST] - Submit new application
   *
   * @param {object} Application (refer to Application Model)
   * @return {string} 200 - Application is successful
   * @return {string} 400 - Error
   */
  if (req.method === "POST") {
    await dbConnect();

    // Check if user is new user
    const session = await getSession({ req });
    let isCorrectUser = await isAuthenticated(req, "NEW USER");
    if (!isCorrectUser) {
      return res.status(401).send("Error");
    }

    // Check if user has submitted an application
    try {
      let application = await Application.findOne({
        email: session.user.email,
        // TODO: add cohort
      }).lean();
      if (application !== null) {
        return res.send("You have already submitted previously");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Error");
      return;
    }

    // Data validation
    let isDataValid = false;
    try {
      isDataValid = await applicationSchema.validate(req.body);
    } catch (err) {
      let errValidationResponse = {
        field: err.path,
        message: err.errors[0],
      };
      console.log(errValidationResponse);
      return res.status(400).send(errValidationResponse);
    }

    // Save into database
    if (isDataValid) {
      try {
        const newApplication = new Application(req.body);
        console.log(req.body);
        await newApplication.save((err, application) => {
          if (err) {
            console.log(err);
            res.send(400).send("Error");
            return;
          }
        });
      } catch (err) {
        console.log(err);
        res.status(400).send("Error");
        return;
      }

      try {
        await User.findOneAndUpdate(
          { _id: session.dbUser._id },
          { role: "APPLICANT" }
        );
      } catch (err) {
        console.log(err);
        res.status(400).send("Error");
        return;
      }

      res.send("Application is successful");
    }

    /**
     * [GET] - View completed application if user is has applied
     *
     * @return {object} 200 - {application}
     * @return {object} 400 - {}
     */
  } else if (req.method === "GET") {
    // Check if user is logged in
    const session = await getSession({ req });
    let isCorrectUser = await isAuthenticated(req, "APPLICANT");
    if (!isCorrectUser) {
      res.status(404).send({});
      return;
    }
    // Find application in database
    let application = await Application.findOne({
      email: session.user.email,
    }).lean();

    res.status(200).send(application);
  } else {
    res.status(404);
  }
}

// Test json data
// {
//   "fullName": "Jason",
//   "email": "behjieshen@gmail.com",
//   "location": "New York",
//   "cohort": "Fall 2020",
//   "education": {
//       "school": "University of Washington",
//       "studentStatus": "Freshman",
//       "universityMajor": "Biology"
//   },
//   "openQuestions": [
//       {
//           "question": "Why are you looking to take a gap semester?",
//           "answer": "For fun"
//       },
//       {
//           "question": "What do you hope to gain from this program?",
//           "answer": "To party"
//       },
//       {
//           "question": "What would you hope to learn from a Xoogler mentor?",
//           "answer": "How to party harder?"
//       }
//   ],
//   "linkedinURL": "https://linkedin.com/",
//   "resumeURL": "https://resume.com/",
//   "youtubeIntroductionURL": "https://youtube.com/",
//   "otherComments": "I love whales.",
//   "status": "NEW APPLICATION"
// }
