import Application from '../../../models/Application';
import dbConnect from '../../../utils/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Data validation
    await dbConnect();
    const newApplication = new Application(req.body);

    await newApplication.save();

  } else {
    res.send('404 error');
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
