import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
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

  const fetcher = (url) =>
    axios.get(url).then((res) => {
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
      return {
        applicationsData: res.data,
        overviewData,
      };
    });

  const { data, error } = useSWR("/api/admin/app", fetcher);
  if (data && !error) console.log("data", data);

  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    if (typeof data !== "undefined") {
      setOverviewData(data.overviewData);
    }
  }, [data]);

  if (!loading && session) {
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }

  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState(null);

  if (error) return <div>Error Loading Data</div>;
  if (!data) return <Loading />;

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

  if (
    !loading &&
    session !== typeof "undefined" &&
    session.dbUser.role !== "ADMIN"
  ) {
    return <></>;
  } else if (showDetailView)
    return (
      <DetailedView
        data={detailViewData}
        setShowDetailView={setShowDetailView}
        updateOverview={updateOverview}
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
            data={data.applicationsData}
            setDetailViewData={setDetailViewData}
            setShowDetailView={setShowDetailView}
            updateOverview={updateOverview}
          />
        </main>
      </div>
    );
  }
}

Index.Layout = MainLayout;
