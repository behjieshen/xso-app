import mongoose from "mongoose";
const { Schema } = mongoose;

// ref link: https://forms.gle/yUjCGbLZwKrKdj698
let applicationSchema = new Schema({
  fullName: String,
  email: String,
  location: String,
  education: {
    school: String,
    studentStatus: String,
    universityMajor: String,
  },
  openQuestions: [
    {
      question: String,
      answer: String,
    },
  ],
  linkedinURL: String,
  resumeURL: String,
  youtubeIntroductionURL: String,
  otherComments: String,
  createdAt: { type: Date, default: Date.now },
  status: { type: Date, default: 'NEW APPLICATION' },
});

export default mongoose.models["Application"] ||
  mongoose.model("Application", applicationSchema, "applications");
