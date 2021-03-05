import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  whitelist: { type: Boolean, default: false },
  image: String,
});

// Mongoose Pagination
applicationSchema.plugin(mongoosePaginate);

export default mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
