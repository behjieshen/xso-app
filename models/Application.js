import mongoose from "mongoose";

// ref link: https://forms.gle/yUjCGbLZwKrKdj698
let applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: String,
  email: String,
  location: String,
  cohort: String,
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
  status: {
    type: String,
    enum: ["NEW APPLICATION", "ACCEPTED", "REJECTED"],
    default: "NEW APPLICATION",
  },
  image: String,
});

export default mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
