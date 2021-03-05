export default function ApplicationsPaginations({ paginationData, setPaginationPage }) {
  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      {/* Previous Pagination Button */}
      <button
        onClick={() => {
          // Save current page in localStorage
          localStorage.setItem("adminApplicationsCurrPage", paginationData.page - 1);
          setPaginationPage(paginationData.page - 1);
        }}
        disabled={paginationData.hasPrevPage === false}
        className="disabled:opacity-50 disabled:cursor-not-allowed relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        <svg
          className="mr-3 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Previous
      </button>

      {/* Select Page Pagination Dropdown  */}
      <div className="block flex justify-center">
        <p className="text-sm text-gray-700">
          Page
          <select
            value={
              parseInt(localStorage.getItem("adminApplicationsCurrPage")) || paginationData.page
            }
            onChange={(e) => {
              // Save current page in localStorage
              localStorage.setItem("adminApplicationsCurrPage", e.target.value);
              setPaginationPage(e.target.value);
            }}
            className="mx-3 mt-1 pl-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {/* List all pages as an option in dropdown */}
            {Array.from({ length: paginationData.totalPages }, (_, i) => i + 1).map((pageNum) => (
              <option key={pageNum} value={pageNum}>
                {pageNum}
              </option>
            ))}
          </select>
          of
          <span className="px-1">{paginationData.totalPages}</span>
        </p>
      </div>
      
      {/* Next Pagination Button */}
      <div className="flex justify-between sm:justify-end">
        <button
          onClick={() => {
            // Save current page in localStorage
            localStorage.setItem("adminApplicationsCurrPage", paginationData.page + 1);
            setPaginationPage(paginationData.page + 1);
          }}
          disabled={paginationData.hasNextPage === false}
          className="disabled:opacity-50 disabled:cursor-not-allowed relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
          <svg
            className="ml-3 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}
