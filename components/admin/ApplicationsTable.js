import ApplicationsTableRow from "./ApplicationsTableRow";

export default function ApplicationsTable({
  data,
  setDetailViewData,
  setShowDetailView,
}) {
  return (
    <div className="block mt-8">
      <div className="align-middle inline-block sm:min-w-full border-b border-gray-200 max-w-full overflow-x-auto">
        {/* <ApplicationsTable data={data} /> */}
        <table className="min-w-full">
          <thead>
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
          <tbody className="bg-white divide-y divide-gray-100">
            {data.map((application, index) => {
              return (
                <ApplicationsTableRow
                  key={application._id}
                  data={application}
                  index={index}
                  setDetailViewData={setDetailViewData}
                  setShowDetailView={setShowDetailView}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
