import axios from "axios";

export default function Header() {
  return (
    <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
          Applications
        </h1>
      </div>
      <div className="mt-4 flex sm:mt-0 sm:ml-4">
        <button
          onClick={() => {
            /////CHANGE THIS TO PROPER API
            axios.get("/api/admin/whitelist").then((response, err) => {
              if (err) {
                console.log(err);
              }
              console.log(response);
            });
          }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Whitelist All Accepted Students
        </button>

        <button
          type="button"
          onClick={() => {
            axios
              .get("/api/admin/export-applications", {
                responseType: "blob",
              })
              .then((response, err) => {
                // Return error if applicable
                if (err) {
                  console.log(err);
                  return;
                }

                // Store blob response data to download 
                const url = window.URL.createObjectURL(
                  new Blob([response.data])
                );

                // Create an "a" tag for file
                const link = document.createElement("a");
                link.href = url;
                let fileName = response.headers["content-disposition"].split(
                  "filename="
                )[1];
                link.setAttribute("download", fileName);
                document.body.appendChild(link);

                // Click on link to download csv
                link.click();
              });
          }}
          className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}
