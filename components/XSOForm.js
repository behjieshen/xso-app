import axios from "axios";
import { ErrorMessage, getIn, setNestedObjectValues, useFormik } from "formik";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { uploadFile } from "../utils/firebase";
import { applicationSchema } from "../models/validationSchema";
import { getNestedValueInObject } from "../utils/getNestedValueInObject";
import * as yup from "yup";
import Input from "./form/Input";
import isEmptyObject from "../utils/isEmptyObject";
import { useRouter } from "next/router";
import lodash from "lodash";

export default function XSOForm() {
  const [resumeData, setResumeData] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    education: {
      school: "",
      studentStatus: "",
      universityMajor: "",
    },
    cohort: "Fall 2020",
    openQuestions: [
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
  });

  const saveFormData = (key, value) => {
    let newFormData = {
      ...formData,
    };
    if (key.includes(".")) {
      _.set(newFormData, key, value);
    } else {
      newFormData[key] = value;
    }
    setFormData(newFormData);
    localStorage.setItem("formData", JSON.stringify(newFormData));
  };

  useEffect(() => {
    if (localStorage.getItem("formData") !== null) {
      setFormData(JSON.parse(localStorage.getItem("formData")));
    }
  }, [localStorage]);

  const [session] = useSession();
  const router = useRouter();
  let initialValues = { email: session.user.email, image: session.user.image };
  if (localStorage.getItem("formData") !== null) {
    initialValues = {
      ...initialValues,
      ...JSON.parse(localStorage.getItem("formData")),
    };
  } else {
    initialValues = { ...initialValues, ...formData };
  }
  const formik = useFormik({
    validationSchema: applicationSchema.concat(
      yup.object({
        resumeFile: yup.mixed().required("*This field is required"),
      })
    ),
    initialValues,
    // initialValues: {
    //   ...(JSON.parse(localStorage.getItem("formData")) || formData),
    //   email: session.user.email,
    //   image: session.user.image,
    // },
    onSubmit: async (values, { resetForm }) => {
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
          localStorage.removeItem("formData");
          console.log(data);
          router.push("/");
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
    <div className="px-6 py-8 lg:px-20 lg:py-16">
      <form
        encType="multipart/form-data"
        className="space-y-8 divide-gray-200"
        onSubmit={formik.handleSubmit}
      >
        <div className="space-y-5 divide-gray-200 lg:space-y-6">
          {/* Basic Info */}
          <h3 className="leading-6 font-medium text-xl text-gray-900 border-b pb-5">
            Basic Info
          </h3>
          <div className="space-y-8 lg:space-y-5 pt-5 lg:pt-0">
            {/* Full Name */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Full Name"
              fieldName="fullName"
              required
            />

            {/* Location */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Location"
              fieldName="location"
              required
            />

            {/* What is your LinkedIn? (if you have one) */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Linkedin URL"
              fieldName="linkedinURL"
            >
              <p
                className={`text-xxs font-base  ${
                  getNestedValueInObject("linkedinURL", formik.errors) &&
                  getNestedValueInObject("linkedinURL", formik.touched)
                    ? "text-red-400"
                    : "text-gray-400"
                } `}
              >
                (if you have one)
              </p>
            </Input>

            {/* Resume */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="resume"
                className={`block text-sm font-medium sm:mt-px sm:pt-2 ${
                  getNestedValueInObject("resumeFile", formik.errors) &&
                  getNestedValueInObject("resumeFile", formik.touched)
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
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
                      getNestedValueInObject("resumeFile", formik.errors) &&
                      getNestedValueInObject("resumeFile", formik.touched)
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
                          className={`mx-auto h-8 w-8  ${
                            getNestedValueInObject(
                              "resumeFile",
                              formik.errors
                            ) &&
                            getNestedValueInObject("resumeFile", formik.touched)
                              ? "text-red-400"
                              : "text-gray-300"
                          }`}
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

                      <div
                        className={`flex text-sm ${
                          getNestedValueInObject("resumeFile", formik.errors) &&
                          getNestedValueInObject("resumeFile", formik.touched)
                            ? "text-red-500"
                            : "text-gray-600"
                        } flex-col flex items-center`}
                      >
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
                        <p
                          className={`text-xs  ${
                            getNestedValueInObject(
                              "resumeFile",
                              formik.errors
                            ) &&
                            getNestedValueInObject("resumeFile", formik.touched)
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                        >
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

          {/* Education */}
          <h3 className="leading-6 font-medium text-xl text-gray-900 pt-12 border-b pb-5">
            Education
          </h3>
          <div className="space-y-8 lg:space-y-5 pt-5 lg:pt-0">
            {/* Where do you currently (or did you) go to school? */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="School"
              fieldName="education.school"
              required
            />

            {/* Major */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Major"
              fieldName="education.universityMajor"
              required
            />

            {/* Student Status */}
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
              <label
                htmlFor="country"
                className={`block text-sm font-medium sm:mt-px sm:pt-2 ${
                  getNestedValueInObject(
                    "education.studentStatus",
                    formik.errors
                  ) &&
                  getNestedValueInObject(
                    "education.studentStatus",
                    formik.touched
                  )
                    ? "text-red-500"
                    : "text-gray-700"
                }`}
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
                      "College Graduate",
                      "Master's Student",
                    ].map((status, index) => (
                      <div className="flex items-center py-2" key={index}>
                        <input
                          id={status}
                          name="education.studentStatus"
                          checked={
                            getNestedValueInObject(
                              "education.studentStatus",
                              formData
                            ) === status
                              ? "checked"
                              : ""
                          }
                          onChange={(e) => {
                            formik.handleChange(e);
                            saveFormData("education.studentStatus", status);
                          }}
                          value={status}
                          type="radio"
                          className={`focus-within:outline-none h-4 w-4 text-indigo-600 ${
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.errors
                            ) &&
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.touched
                            )
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <label
                          htmlFor={status}
                          className={`ml-3 block text-sm ${
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.errors
                            ) &&
                            getNestedValueInObject(
                              "education.studentStatus",
                              formik.touched
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

          {/* Get To Know You! */}
          <h3 className="leading-6 font-medium text-xl text-gray-900 pt-12 border-b pb-5">
            Get To Know You!
          </h3>
          <div className="space-y-8 lg:space-y-5 pt-5 lg:pt-0">
            {/* Youtube Introduction Video */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Youtube Introduction URL"
              fieldName="youtubeIntroductionURL"
              required
            >
              <p
                className={`text-xxs font-base  ${
                  getNestedValueInObject(
                    "youtubeIntroductionURL",
                    formik.errors
                  ) &&
                  getNestedValueInObject(
                    "youtubeIntroductionURL",
                    formik.touched
                  )
                    ? "text-red-400"
                    : "text-gray-400"
                } `}
              >
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
                You are allowed to make the video private, but please ensure the
                link is working.
              </p>
            </Input>
            {/* Open Questions */}
            {formik.values.openQuestions.map((response, index) => (
              <Input
                key={index}
                formik={formik}
                saveFormData={saveFormData}
                displayName={response.question}
                fieldName={`openQuestions.${index}.answer`}
                type="textarea"
              />
            ))}

            {/* Other Comments */}
            <Input
              formik={formik}
              saveFormData={saveFormData}
              displayName="Is there anything else that you'd like to share?"
              fieldName="otherComments"
              type="textarea"
            />
          </div>
        </div>

        <div className="pt-5">
          <div className="flex flex-col  md:flex-row md:justify-end items-center">
            {!isEmptyObject(formik.errors) && !isEmptyObject(formik.touched) ? (
              <p className="text-red-500 mr-5 mb-5 md:mb-0">
                * Please fill up all required elements
              </p>
            ) : null}
            <button
              type="button"
              className="bg-white mb-3 w-full py-2 md:mb-0 md:w-auto md:px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="md:ml-3 inline-flex justify-center w-full py-2 md:w-auto md:px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus-within:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
