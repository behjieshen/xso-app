import mongoose from "mongoose";
import * as yup from "yup";
const { Schema } = mongoose;

// ref link: https://forms.gle/yUjCGbLZwKrKdj698
let applicationSchema = new Schema({
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
});

let validationSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  location: yup.string().required(),
  cohort: yup.string().required(),
  education: yup
    .object()
    .shape({
      school: yup.string().required(),
      studentStatus: yup.string().required(),
      universityMajor: yup.string().required(),
    })
    .required(),
  openQuestions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required(),
        answer: yup.string().required(),
      })
    )
    .required(),
  linkedinURL: yup.string().required().url(),
  resumeURL: yup.string().required().url(),
  youtubeIntroductionURL: yup.string().required().url(),
  otherComments: yup.string().required(),
  createdAt: yup.date().default(function () {
    return new Date();
  }),
  status: yup
    .mixed()
    .oneOf(["NEW APPLICATION", "ACCEPTED", "REJECTED"])
    .default(function () {
      return "NEW APPLICATION";
    }),
});

export { validationSchema };

export const Application =
  mongoose.models["Application"] ||
  mongoose.model("Application", applicationSchema, "applications");
