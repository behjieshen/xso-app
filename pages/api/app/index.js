/**
 * Route URL: /api/app
 * 
 * [GET] - View complete application data if user is logged in and has applied
 * [POST] - Submit new application
 * 
 */

import { getSession } from "next-auth/client";
import Application from "../../../models/Application";
import dbConnect from "../../../utils/mongodb";

export default async function handler(req, res) {

  if (req.method === "POST") {
    await dbConnect();

    // TODO: Data validation

    try {
      const newApplication = new Application(req.body);
      await newApplication.save();
      res.status(200).send("Application is successful");
    } catch(err) {
      console.log(err);
      res.status(400).send("Error");
    }

  } else if (req.method === "GET") {
    const session = await getSession({ req });

    // Check if user is logged in
    if (!session) {
      res.send("You are not logged in");
    } else {
      // Find application in database
      let application = await Application.findOne({email: session.user.email}).exec();

      // If no entry, ask them to fill in
      // Else return application data
      if(!application) {
        res.send('no application')
      } else {
        res.send(application);
      }
    }
  } else {
    res.status(404);
  }
}

// Test json data
// {
//   "fullName": "Tommy",
//   "email": "tom@gmail.com",
//   "location": "New York",
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
//   "otherComments": "I love whales."
// }
