import OverviewStats from "./OverviewStats";

export default function Overview({ overviewData }) {
  // Display overviewData according to data provided

  if (overviewData !== null && typeof overviewData !== "undefined")
    return (
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">Overview</h2>
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-3">
          <OverviewStats
            data={overviewData.total}
            title="Total"
            subtitle="Applications"
            bgClass="bg-gray-800"
          />
          <OverviewStats
            data={overviewData.unlabelled}
            title="Unlabelled"
            subtitle={`${((overviewData.unlabelled / overviewData.total) * 100).toFixed(2)}% left`}
            bgClass="bg-yellow-400"
          />
          <OverviewStats
            data={overviewData.rejected}
            title="Rejected"
            subtitle={`${((overviewData.rejected / overviewData.total) * 100).toFixed(
              2
            )}% of applications`}
            bgClass="bg-red-600"
          />
          <OverviewStats
            data={overviewData.accepted}
            title="Accepted"
            subtitle={`${((overviewData.accepted / overviewData.total) * 100).toFixed(
              2
            )}% of applications`}
            bgClass="bg-green-600"
          />
        </ul>
      </div>
    );
  else return <></>;
}
