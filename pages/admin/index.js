import { useEffect, useState } from "react";
import useSWR from "swr";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import Header from "../../components/admin/Header";
import MainLayout from "../../layout/MainLayout";
import { useSession } from "next-auth/client";
import Router from "next/router";
import Loading from "../../components/utils/Loading";
import DetailedView from "../../components/admin/DetailedView";
import Overview from "../../components/admin/Overview";
import ApplicationsPaginations from "../../components/admin/ApplicationsPagination";
import WhitelistHeader from "../../components/admin/WhitelistHeader";

export default function Index({ tab }) {
  const [session, loading] = useSession();
  const [overviewData, setOverviewData] = useState(null);
  const [applicationsData, setApplicationsData] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState({
    data: {},
    index: null,
  });
  const [paginationPage, setPaginationPage] = useState(
    localStorage.getItem("adminApplicationsCurrPage") || 1
  );
  const [paginationData, setPaginationData] = useState({});

  // Redirect user to home page for non-admins
  if (!loading && session) {
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }

  // Retrieve applications data from API

  const { data: applicationsAPIData, error: applicationsError } = useSWR(
    tab == "apps"
      ? `/api/admin/app?page=${paginationPage}`
      : `/api/admin/app/whitelist` /////CHANGE THIS TO PROPER API
  );
  const { data: overviewAPIData, error: overviewError } = useSWR(
    `/api/admin/app/overview-data`
  );

  useEffect(() => {
    if (typeof overviewAPIData !== "undefined") {
      setOverviewData(overviewAPIData.data);
    }
  }, [overviewAPIData]);

  // Set state once API call returns data
  useEffect(() => {
    if (typeof applicationsAPIData !== "undefined") {
      setApplicationsData(applicationsAPIData.data);
      setPaginationData(applicationsAPIData.paginationData);
    }
  }, [applicationsAPIData]);

  // Handle loading and error in API call
  if (applicationsError || overviewError) return <div>Error Loading Data</div>;
  if (!applicationsAPIData && overviewAPIData)
    return (
      <div className="flex flex-col w-0 flex-1">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <Header />
          <Overview overviewData={overviewData} />
          <Loading small />
        </main>
      </div>
    );
  if (!applicationsAPIData || !overviewAPIData) return <Loading />;

  // Update applicationsData state (to be passed as props)
  const updateData = (originalData, updatedApplication, index) => {
    let updatedData = originalData;
    let nonPaginatedIndex =
      index - (paginationData.page - 1) * paginationData.limit;
    updatedData[nonPaginatedIndex] = updatedApplication;
    setApplicationsData(updatedData);
  };

  // Update overviewData state (to be passed as props)
  const updateOverview = (type, isPreviouslyUnlabelled) => {
    if (type === "accepted") {
      if (isPreviouslyUnlabelled) {
        setOverviewData({
          ...overviewData,
          unlabelled: overviewData.unlabelled - 1,
          accepted: overviewData.accepted + 1,
        });
      } else {
        setOverviewData({
          ...overviewData,
          rejected: overviewData.rejected - 1,
          accepted: overviewData.accepted + 1,
        });
      }
    }
    if (type === "rejected") {
      if (isPreviouslyUnlabelled) {
        setOverviewData({
          ...overviewData,
          unlabelled: overviewData.unlabelled - 1,
          rejected: overviewData.rejected + 1,
        });
      } else {
        setOverviewData({
          ...overviewData,
          rejected: overviewData.rejected + 1,
          accepted: overviewData.accepted - 1,
        });
      }
    }
  };

  // 3 scenarios of render
  // 1. If they are non-admins, display nothing
  // 2. If request for detail view, show detailed application view
  // 3. Else display default admin overview and table page

  if (
    !loading &&
    session !== typeof "undefined" &&
    session.dbUser.role !== "ADMIN"
  ) {
    return <></>;
  } else if (showDetailView)
    return (
      <DetailedView
        data={detailViewData.data}
        index={detailViewData.index}
        setShowDetailView={setShowDetailView}
        updateOverview={updateOverview}
        updateData={(updatedApplication, index) =>
          updateData(applicationsData, updatedApplication, index)
        }
      />
    );
  else {
    return (
      <div className="flex flex-col w-0 flex-1">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          {tab == "apps" && (
            <>
              <Header />
              <Overview overviewData={overviewData} />
            </>
          )}
          {tab == "whitelist" && <WhitelistHeader />}
          <ApplicationsTable
            data={applicationsData}
            setDetailViewData={setDetailViewData}
            setShowDetailView={setShowDetailView}
            updateOverview={updateOverview}
            updateData={updateData}
            paginationData={paginationData}
          />
          {tab == "apps" && (
            <ApplicationsPaginations
              paginationData={paginationData}
              setPaginationPage={setPaginationPage}
            />
          )}
        </main>
      </div>
    );
  }
}

Index.Layout = MainLayout;
