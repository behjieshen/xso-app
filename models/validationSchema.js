import * as yup from "yup";

export const applicationSchema = yup.object().shape({
  fullName: yup.string().required('This field is required'),
  email: yup.string().email('Invalid email address').required('This field is required'),
  location: yup.string().required('This field is required'),
  cohort: yup.string().required('This field is required'),
  education: yup
    .object()
    .shape({
      school: yup.string().required('This field is required'),
      studentStatus: yup.string().required('This field is required'),
      universityMajor: yup.string().required('This field is required'),
    })
    .required('This field is required'),
  openQuestions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required('This field is required'),
        answer: yup.string().required('This field is required'),
      })
    )
    .required('This field is required'),
  linkedinURL: yup.string().url('Invalid URL'),
  resumeURL: yup.string().url('Invalid URL'),
  youtubeIntroductionURL: yup.string().required('This field is required').url('Invalid URL'),
  otherComments: yup.string(),
  createdAt: yup.date().default(function () {
    return new Date();
  }),
  status: yup
    .mixed()
    .oneOf(["NEW APPLICATION", "ACCEPTED", "REJECTED"])
    .default(function () {
      return "NEW APPLICATION";
    }),
  image: yup.string().required('This field is required').url('Invalid URL'),
});
