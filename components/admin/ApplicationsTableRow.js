import { useState } from "react";
import axios from "axios";

export default function ApplicationsTableRow({
  data: application,
  index,
  setDetailViewData,
  setShowDetailView,
  updateOverview,
  updateData,
}) {
  // Destructure data to be displayed in table
  const {
    fullName,
    education: { school, studentStatus, universityMajor },
    status,
    _id: id,
  } = application;

  const [activeAcceptButton, setActiveAcceptButton] = useState(
    status === "ACCEPTED"
  );
  const [activeRejectButton, setActiveRejectButton] = useState(
    status === "REJECTED"
  );

  return (
    <tr
      className="px-6 cursor-pointer hover:bg-gray-100"
      onClick={() => {
        // Show detail view once user click on row
        setDetailViewData(application);
        setShowDetailView(true);
      }}
    >
      <td className="pl-6 py-3 px-2 text-sm text-gray-500 font-medium">
        {index + 1}
      </td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium">
        {fullName}
      </td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">
        {school}
      </td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">
        {studentStatus}
      </td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">
        {universityMajor}
      </td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left flex">
        <button
          onClick={async (e) => {
            // Prevent propagating click event to parent elements that will trigger detailed view
            e.stopPropagation();

            // Update overviewData state
            updateOverview("accepted", status === "NEW APPLICATION");

            // Update application state
            let newApplicationData = { ...application, status: "ACCEPTED" };
            updateData(newApplicationData, index);

            // Adjust state for detailed view buttons
            setActiveAcceptButton(true);
            setActiveRejectButton(false);

            // Update database in the background after UI changes are made
            try {
              await axios.put(`/api/admin/app/${id}/accept`);
            } catch (err) {
              console.log(err);
            }
          }}
          type="submit"
          className={`w-full inline-flex items-center justify-center px-3 py-1 border border-transparent shadow-sm font-medium rounded-md text-white ${
            activeAcceptButton
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-300 hover:bg-gray-400"
          } focus:outline-none sm:mt-0 sm:w-auto sm:text-sm`}
        >
          Accept
        </button>
        <button
          onClick={async (e) => {
            // Prevent propagating click event to parent elements that will trigger detailed view
            e.stopPropagation();

            // Update overviewData state
            updateOverview("rejected", status === "NEW APPLICATION");

            // Update application state
            let newApplicationData = { ...application, status: "REJECTED" };
            updateData(newApplicationData, index);

            // Adjust state for detailed view buttons
            setActiveAcceptButton(false);
            setActiveRejectButton(true);

            // Update database in the background after UI changes are made
            try {
              await axios.put(`/api/admin/app/${id}/reject`);
            } catch (err) {
              console.log(err);
            }
          }}
          type="submit"
          className={`w-full inline-flex items-center justify-center px-3 py-1 border border-transparent shadow-sm font-medium rounded-md text-white ${
            activeRejectButton
              ? "bg-red-600 hover:bg-red-700"
              : "bg-gray-300 hover:bg-gray-400"
          } focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
        >
          Reject
        </button>
      </td>
      <td className="pr-6 cursor-pointer">
        <div className="relative flex justify-end items-center text-xxs text-gray-400 font-medium">
          <svg
            className="w-5 h-5 bg-transparent inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          {/* <svg
            className="w-5 h-5 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg> */}
          {/* <button
            id="project-options-menu-0"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-haspopup="true"
            type="button"
            className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="sr-only">Open options</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button> */}
          {/* <!--
              Dropdown panel, show/hide based on dropdown state.

              Entering: "transition ease-out duration-100"
                From: "transform opacity-0 scale-95"
                To: "transform opacity-100 scale-100"
              Leaving: "transition ease-in duration-75"
                From: "transform opacity-100 scale-100"
                To: "transform opacity-0 scale-95"
            --> */}

          {/* <Transition
            show={showDropdown}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
            className="mx-3 origin-top-right absolute right-7 top-0 w-48 mt-1 rounded-md shadow-lg z-10 bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="project-options-menu-0"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500s"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                View More
              </a>
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                  <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                </svg>
                Duplicate
              </a>
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                </svg>
                Share
              </a>
            </div>
            <div className="py-1" role="none">
              <a
                href="#"
                className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                <svg
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Delete
              </a>
            </div>
          </Transition> */}
        </div>
      </td>
    </tr>
  );
}
