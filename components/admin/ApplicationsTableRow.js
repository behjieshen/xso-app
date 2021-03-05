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

  const [activeAcceptButton, setActiveAcceptButton] = useState(status === "ACCEPTED");
  const [activeRejectButton, setActiveRejectButton] = useState(status === "REJECTED");

  return (
    <tr
      className="px-6 cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
      onClick={() => {
        // Show detail view once user click on row
        setDetailViewData({ data: application, index });
        setShowDetailView(true);
      }}
    >
      {/* Numbering have to plus one due to zero-index */}
      <td className="pl-6 py-3 px-2 text-sm text-gray-500 font-medium">{index + 1}</td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium">{fullName}</td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">{school}</td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">{studentStatus}</td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left">{universityMajor}</td>
      <td className="py-3 px-2 text-sm text-gray-500 font-medium text-left flex">
        {/* Accept Button */}
        <button
          onClick={async (e) => {
            // Prevent propagating click event to parent elements that will trigger detailed view
            e.stopPropagation();

            // Only allow state change if accept button is not clicked
            if (!activeAcceptButton) {
              // Update overviewData state
              updateOverview("accepted", status === "NEW APPLICATION");

              // Update application state
              let newApplicationData = { ...application, status: "ACCEPTED" };
              updateData(newApplicationData, index);

              // Adjust state for accept/reject buttons
              setActiveAcceptButton(true);
              setActiveRejectButton(false);

              // Update database in the background after UI changes are made
              try {
                await axios.put(`/api/admin/app/${id}/accept`);
              } catch (err) {
                console.log(err);
              }
            }
          }}
          type="submit"
          className={`w-full inline-flex items-center justify-center px-3 py-1 border border-transparent shadow-sm font-medium rounded-md text-white ${
            activeAcceptButton ? "bg-green-600 hover:bg-green-700" : "bg-gray-300 hover:bg-gray-400"
          } focus:outline-none sm:mt-0 sm:w-auto sm:text-sm`}
        >
          Accept
        </button>
        {/* Reject Button */}
        <button
          onClick={async (e) => {
            // Prevent propagating click event to parent elements that will trigger detailed view
            e.stopPropagation();

            // Only allow state change if reject button is not clicked
            if (!activeRejectButton) {
              // Update overviewData state
              updateOverview("rejected", status === "NEW APPLICATION");

              // Update application state
              let newApplicationData = { ...application, status: "REJECTED" };
              updateData(newApplicationData, index);

              // Adjust state for accept/reject buttons
              setActiveAcceptButton(false);
              setActiveRejectButton(true);

              // Update database in the background after UI changes are made
              try {
                await axios.put(`/api/admin/app/${id}/reject`);
              } catch (err) {
                console.log(err);
              }
            }
          }}
          type="submit"
          className={`w-full inline-flex items-center justify-center px-3 py-1 border border-transparent shadow-sm font-medium rounded-md text-white ${
            activeRejectButton ? "bg-red-600 hover:bg-red-700" : "bg-gray-300 hover:bg-gray-400"
          } focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`}
        >
          Reject
        </button>
      </td>
      {/* Right Arrow Icon */}
      <td className="pr-6 cursor-pointer">
        <div className="relative flex justify-end items-center text-xxs text-gray-400 font-medium">
          <svg
            className="w-5 h-5 bg-transparent inline-flex items-center justify-center text-gray-400 rounded-full hover:text-gray-500 focus:outline-none"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </td>
    </tr>
  );
}
