import * as yup from "yup";

const regexURL = /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i


export const applicationSchema = yup.object().shape({
  fullName: yup.string().required('*This field is required'),
  email: yup.string().email('Invalid email address').required('*This field is required'),
  location: yup.string().required('*This field is required'),
  cohort: yup.string().required('*This field is required'),
  education: yup
    .object()
    .shape({
      school: yup.string().required('*This field is required'),
      studentStatus: yup.string().required('*This field is required'),
      universityMajor: yup.string().required('*This field is required'),
    })
    .required('*This field is required'),
  openQuestions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required('*This field is required'),
        answer: yup.string().required('*This field is required'),
      })
    )
    .required('*This field is required'),
  linkedinURL: yup.string().matches(regexURL, "Invalid URL"),
  resumeURL: yup.string().matches(regexURL, "Invalid URL"),
  youtubeIntroductionURL: yup.string().required('*This field is required').matches(regexURL, "Invalid URL"),
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
  image: yup.string().required('*This field is required').matches(regexURL, "Invalid URL"),
});
