import { Field, getIn, ErrorMessage } from "formik";

export default function Input({ errors, fieldName, displayName, required, children}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
      <label
        htmlFor="fullName"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {displayName}{required === true ? '*' : null}
        {typeof children !== "undefined" ? children : null}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <Field
          type="text"
          name={fieldName}
          className={`block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
            getIn(errors, fieldName) ? "border-red-500" : "border-gray-300"
          } rounded-md`}
        />
        <ErrorMessage
          component="p"
          className="mt-2 text-sm text-red-500"
          name={fieldName}
        />
      </div>
    </div>
  );
}
