import mongoose from 'mongoose';
const { Schema } = mongoose;

// ref link: https://forms.gle/yUjCGbLZwKrKdj698
const applicationSchema = new Schema({
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
  youtubeURL: String,
  otherComments: String,
});

export const Application = mongoose.model('Application', applicationSchema);
