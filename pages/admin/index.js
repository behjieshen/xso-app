import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import ApplicationsTableRow from "../../components/admin/ApplicationsTableRow";
import BasicStats from "../../components/admin/BasicStats";
import Header from "../../components/admin/Header";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import { useSession } from "next-auth/client";
import Router from "next/router";
import Loading from "../../components/utils/Loading";
import DetailedView from "../../components/admin/DetailedView";

export default function Index() {
  const { data, error } = useSWR("/api/admin/app", {
    revalidateOnFocus: true,
  });

  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState(null);

  let overviewData = {
    unlabelled: 0,
    rejected: 0,
    accepted: 0,
    total: 0,
  };

  if (error) return <div>Error Loading Data</div>;
  if (!data) return <Loading />;

  data.forEach((application) => {
    if (application.status === "ACCEPTED") overviewData.accepted += 1;
    if (application.status === "REJECTED") overviewData.rejected += 1;
    if (application.status === "NEW APPLICATION") {
      overviewData.unlabelled += 1;
    }
    overviewData.total += 1;
  });

  if (showDetailView) return <DetailedView data={detailViewData} setShowDetailView={setShowDetailView} />;
  else {
    return (
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <Header />
          {/* <!-- Pinned projects --> */}
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
                  (overviewData.unlabelled / overviewData.total) * 100
                }% left`}
                bgClass="bg-yellow-400"
              />
              <BasicStats
                data={overviewData.rejected}
                title="Rejected"
                subtitle={`${
                  (overviewData.rejected / overviewData.total) * 100
                }% of applications`}
                bgClass="bg-red-600"
              />
              <BasicStats
                data={overviewData.accepted}
                title="Accepted"
                subtitle={`${
                  (overviewData.accepted / overviewData.total) * 100
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

          {/* <!-- Projects list (only on smallest breakpoint) --> */}
          <div className="mt-10 sm:hidden">
            <div className="px-4 sm:px-6">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Projects
              </h2>
            </div>
            <ul className="mt-3 border-t border-gray-200 divide-y divide-gray-100">
              <li>
                <a
                  href="#"
                  className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
                >
                  <span className="flex items-center truncate space-x-3">
                    <span
                      className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-pink-600"
                      aria-hidden="true"
                    ></span>
                    <span className="font-medium truncate text-sm leading-6">
                      GraphQL API
                      <span className="truncate font-normal text-gray-500">
                        in Engineering
                      </span>
                    </span>
                  </span>
                  {/* <!-- Heroicon name: chevron-right --> */}
                  <svg
                    className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* <!-- Projects table (small breakpoint and up) --> */}
          <div className="hidden mt-8 sm:block">
            <div className="align-middle inline-block min-w-full border-b border-gray-200">
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
        </main>
      </div>
    );
  }
}

Index.Layout = MainLayout;
