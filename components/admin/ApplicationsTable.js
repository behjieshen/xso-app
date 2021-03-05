import ApplicationsTableRow from "./ApplicationsTableRow";

export default function ApplicationsTable({
  data,
  setDetailViewData,
  setShowDetailView,
  updateOverview,
  updateData,
  paginationData
}) {
  return (
    <div className="block mt-8">
      <div className="align-middle inline-block sm:min-w-full border-b border-gray-200 max-w-full overflow-x-auto">
        <table className="min-w-full">
          <thead>
            {/* Table Headings */}
            <tr className="border-t border-gray-200">
              <th className="pl-6 py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Major
              </th>
              <th className="pr-6 py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CTA
              </th>
              <th className="pr-6 py-3 px-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {/* Table Row (Application) */}
          <tbody className="bg-white divide-y divide-gray-100">
            {typeof data !== 'undefined' && data.map((application, index) => {
              let currentPaginationIndex = index + ((paginationData.page - 1) * paginationData.limit);
              return (
                <ApplicationsTableRow
                  key={application._id}
                  data={application}
                  index={currentPaginationIndex}
                  setDetailViewData={setDetailViewData}
                  setShowDetailView={setShowDetailView}
                  updateOverview={updateOverview}
                  updateData={(updatedApplication, index) => updateData(data, updatedApplication, index)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
