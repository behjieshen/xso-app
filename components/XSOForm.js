import axios from "axios";
import { ErrorMessage, getIn, useFormik } from "formik";
import { useSession } from "next-auth/client";
import { useState } from "react";
import { uploadFile } from "../utils/firebase";
import { applicationSchema } from "../models/validationSchema";
import { getNestedValueInObject } from "../utils/getNestedValueInObject";
import * as yup from "yup";

export default function XSOForm() {
  const [resumeData, setResumeData] = useState(null);
  const [session] = useSession();

  const formik = useFormik({
    validationSchema: applicationSchema.concat(
      yup.object({
        resumeFile: yup.mixed().required("This field is required"),
      })
    ),
    initialValues: {
      fullName: "",
      email: session.user.email,
      location: "",
      education: {
        school: "",
        studentStatus: "",
        universityMajor: "",
      },
      cohort: "Fall 2020",
      openQuestions: [
        {
          question: "Why are you looking to take a gap semester?*",
          answer: "",
        },
        {
          question: "What do you hope to gain from this program?*",
          answer: "",
        },
        {
          question: "What would you hope to learn from a Xoogler mentor?*",
          answer: "",
        },
      ],
      linkedinURL: "",
      resumeURL: "",
      resumeFile: "",
      youtubeIntroductionURL: "",
      otherComments: "",
      image: session.user.image,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const fileExtension = `.${resumeData.name.split(".")[1]}`;
      const fileName = values.fullName.replace(/\s/g, "_") + fileExtension;
      let fileLink;
      try {
        fileLink = await uploadFile(resumeData, fileName);
      } catch (err) {
        console.log("Error");
      }

      if (fileLink !== null) {
        values["resumeURL"] = fileLink;
        try {
          let { data } = await axios.post("/api/app", values);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }

      // await resetForm();
    },
  });

  const ErrorMessage = (field) => {
    let error = getNestedValueInObject(field, formik.errors);
    let touched = getNestedValueInObject(field, formik.touched);
    if (touched && error) {
      return (
        <p className="mt-2 text-sm text-red-500">
          {/* {capitalizeFirstLetter(error.replace(`${field} `, ""))} */}
          {error}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="px-20 py-16">
      <form
        encType="multipart/form-data"
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <h3 className="leading-6 font-medium text-xl text-gray-900">
            Basic Info
          </h3>
          <div className="space-y-6 sm:space-y-5">
            {/* Full Name */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Full Name*
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="full-name"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject("fullName", formik.errors)
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                {ErrorMessage("fullName")}
              </div>
            </div>
            {/* Location */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Location*
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject("location", formik.errors)
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                {ErrorMessage("location")}
                {console.log(formik.errors)}
              </div>
            </div>
            {/* What is your LinkedIn? (if you have one) */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="linkedinURL"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                LinkedIn URL
                <p className="text-xxs font-base text-gray-400">
                  (if you have one)
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="linkedinURL"
                  id="linkedinURL"
                  onChange={formik.handleChange}
                  value={formik.values.linkedinURL}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject("linkedinURL", formik.errors)
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                {ErrorMessage("linkedinURL")}
              </div>
            </div>

            {/* Resume */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="resume"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Resume*
              </label>

              <div className="mt-2 sm:mt-0 sm:col-span-2">
                <label
                  htmlFor="file-upload"
                  className="relative w-full cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                >
                  <div
                    className={`max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed ${
                      getNestedValueInObject("resumeFile", formik.errors)
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  >
                    <div className="space-y-1 text-center">
                      {resumeData !== null &&
                      typeof resumeData !== "undefined" ? (
                        <svg
                          className="mx-auto h-8 w-8 text-green-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="mx-auto h-8 w-8 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}

                      <div className="flex text-sm text-gray-600 flex-col flex items-center">
                        <span>
                          {resumeData !== null &&
                          typeof resumeData !== "undefined"
                            ? resumeData.name
                            : "Upload a file"}
                        </span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          onChange={(e) => {
                            setResumeData(e.target.files[0]);
                            formik.setFieldValue(
                              "resumeFile",
                              e.target.files[0].name
                            );
                          }}
                          className="sr-only"
                          accept=".doc, .docx, .pdf"
                        />
                      </div>
                      {resumeData !== null &&
                      typeof resumeData !== "undefined" ? null : (
                        <p className="text-xs text-gray-500">
                          .pdf or .docx only
                        </p>
                      )}
                    </div>
                  </div>
                </label>
                {ErrorMessage("resumeFile")}
              </div>
            </div>
          </div>
          <h3 className="leading-6 font-medium text-xl text-gray-900 pt-12">
            Education
          </h3>
          <div className="space-y-6 sm:space-y-5">
            {/* Where do you currently (or did you) go to school? */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="school"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                School*
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="education.school"
                  id="school"
                  autoComplete="school"
                  onChange={formik.handleChange}
                  value={formik.values.education.school}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject("education.school", formik.errors)
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                />
                {ErrorMessage("education.school")}
              </div>
            </div>
            {/* Major */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="major"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Major*
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="education.universityMajor"
                  id="universityMajor"
                  autoComplete="major"
                  onChange={formik.handleChange}
                  value={formik.values.education.universityMajor}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject(
                      "education.universityMajor",
                      formik.errors
                    )
                      ? "border-red-500"
                      : "border-gray-200"
                  } rounded-md`}
                />
                {ErrorMessage("education.universityMajor")}
              </div>
            </div>
            {/* Student Status */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Student Status*
              </label>
              <div className="sm:col-span-2">
                <div className="max-w-lg">
                  <div className="mt-4">
                    {[
                      "High School Graduate",
                      "College Freshman",
                      "College Sophomore",
                      "College Junior",
                      "College Senior",
                    ].map((status, index) => (
                      <div className="flex items-center py-2" key={index}>
                        <input
                          id="studentStatus"
                          name="education.studentStatus"
                          onChange={formik.handleChange}
                          value={status}
                          type="radio"
                          className={`focus-within:outline-none h-4 w-4 text-indigo-600 ${
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.errors
                            )
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <label
                          htmlFor="studentStatus"
                          className={`ml-3 block text-sm ${
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.errors
                            )
                              ? "text-red-500"
                              : "text-gray-700"
                          }`}
                        >
                          {status}
                        </label>
                      </div>
                    ))}
                  </div>
                  {ErrorMessage("education.studentStatus")}
                </div>
              </div>
            </div>
          </div>
          <h3 className="leading-6 font-medium text-xl text-gray-900 pt-12">
            Get To Know You!
          </h3>
          <div className="space-y-6 sm:space-y-5">
            {/* Youtube Introduction Video */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="youtubeIntroductionURL"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Youtube Introduction Link*
                <p className="text-xxs font-base text-gray-400">
                  Record a 1 minute video to introduce yourself!
                  <br />
                  <br />
                  In the video, be sure to include:
                  <br />
                  1. Share your name
                  <br />
                  2. Where you are from
                  <br />
                  3. Share one fun fact about yourself
                  <br />
                  4. What do you want to get out of the program
                  <br />
                  5. Where do you want to be in 5-10 years time
                  <br />
                  <br />
                  You are allowed to make the video private, but please ensure
                  the link is working.
                </p>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="youtubeIntroductionURL"
                  id="youtubeIntroductionURL"
                  onChange={formik.handleChange}
                  value={formik.values.youtubeIntroductionURL}
                  className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    getNestedValueInObject(
                      "youtubeIntroductionURL",
                      formik.errors
                    )
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-md`}
                />
                {ErrorMessage("youtubeIntroductionURL")}
              </div>
            </div>
            {formik.values.openQuestions.map((response, index) => (
              <div
                key={index}
                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5"
              >
                <label
                  htmlFor={`openQuestions.${index}.question`}
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  {response.question}
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id={`openQuestions.${index}.answer`}
                    name={`openQuestions.${index}.answer`}
                    rows="4"
                    onChange={formik.handleChange}
                    value={formik.values.openQuestions[index].answer}
                    className={`max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      getNestedValueInObject(
                        `openQuestions.${index}.answer`,
                        formik.errors
                      )
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md`}
                  ></textarea>
                  {ErrorMessage(`openQuestions.${index}.answer`)}
                </div>
              </div>
            ))}

            {/* Other Comments */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Do you have any comments?
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="otherComments"
                  name="otherComments"
                  rows="4"
                  onChange={formik.handleChange}
                  value={formik.values.otherComments}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                ></textarea>
                {ErrorMessage("otherComments")}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus-within:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
