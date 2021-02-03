import BasicStats from "./BasicStats";

export default function Overview({overviewData}) {
  return (
    <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Overview
      </h2>
      <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-3">
        <BasicStats
          data={overviewData.total}
          title="Total"
          subtitle="Applications"
          bgClass="bg-gray-800"
        />
        <BasicStats
          data={overviewData.unlabelled}
          title="Unlabelled"
          subtitle={`${
            ((overviewData.unlabelled / overviewData.total) * 100).toFixed(2)
          }% left`}
          bgClass="bg-yellow-400"
        />
        <BasicStats
          data={overviewData.rejected}
          title="Rejected"
          subtitle={`${
            ((overviewData.rejected / overviewData.total) * 100).toFixed(2)
          }% of applications`}
          bgClass="bg-red-600"
        />
        <BasicStats
          data={overviewData.accepted}
          title="Accepted"
          subtitle={`${
            ((overviewData.accepted / overviewData.total) * 100).toFixed(2)
          }% of applications`}
          bgClass="bg-green-600"
        />
        {/* <li className="relative col-span-1 flex shadow-sm rounded-md">
  <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-600 text-white text-base font-medium rounded-l-md">
    500
  </div>
  <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
    <div className="flex-1 px-4 py-2 text-base truncate">
      <a
        href="#"
        className="text-gray-900 font-medium hover:text-gray-600"
      >
        Total
      </a>
      <p className="text-gray-500 text-xs">Applications</p>
    </div>
  </div>
</li> */}
      </ul>
    </div>
  );
}
