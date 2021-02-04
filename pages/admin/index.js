import { useEffect, useState } from "react";
import useSWR from "swr";
import ApplicationsTable from "../../components/admin/ApplicationsTable";
import Header from "../../components/admin/Header";
import MainLayout from "../../layout/MainLayout";
import axios from "axios";
import { useSession } from "next-auth/client";
import Router from "next/router";
import Loading from "../../components/utils/Loading";
import DetailedView from "../../components/admin/DetailedView";
import Overview from "../../components/admin/Overview";

export default function Index() {
  const [session, loading] = useSession();
  const [overviewData, setOverviewData] = useState(null);
  const [applicationsData, setApplicationsData] = useState([]);
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState({
    data: {},
    index: null,
  });

  // Redirect user to home page for non-admins
  if (!loading && session) {
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }

  // Use Axios to fetch data
  const fetcher = (url) =>
    axios.get(url).then((res) => {
      // Compute overview
      let overviewData = {
        accepted: 0,
        rejected: 0,
        unlabelled: 0,
        total: 0,
      };
      res.data.map((application) => {
        if (application.status === "REJECTED") overviewData.rejected += 1;
        if (application.status === "ACCEPTED") overviewData.accepted += 1;
        if (application.status === "NEW APPLICATION")
          overviewData.unlabelled += 1;
        overviewData.total += 1;
      });
      // return as { data } in useSWR
      return {
        applicationsData: res.data,
        overviewData,
      };
    });

  // Retrieve applications data from API
  const { data, error } = useSWR("/api/admin/app", fetcher);

  // Set state once API call returns data
  useEffect(() => {
    if (typeof data !== "undefined") {
      setOverviewData(data.overviewData);
      setApplicationsData(data.applicationsData);
    }
  }, [data]);

  // Handle loading and error in API call
  if (error) return <div>Error Loading Data</div>;
  if (!data) return <Loading />;

  // Update applicationsData state (to be passed as props)
  const updateData = (originalData, updatedApplication, index) => {
    let updatedData = originalData;
    updatedData[index] = updatedApplication;
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
          <Header />
          <Overview overviewData={overviewData} />
          <ApplicationsTable
            data={applicationsData}
            setDetailViewData={setDetailViewData}
            setShowDetailView={setShowDetailView}
            updateOverview={updateOverview}
            updateData={updateData}
          />
        </main>
      </div>
    );
  }
}

Index.Layout = MainLayout;
