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

  let data = [];
  let error;

  const { data: applicationData, error: applicationError } = useSWR(
    "/api/admin/app",
    {
      revalidateOnFocus: true,
    }
  );
  data = applicationData;
  error = applicationError;

  if (!loading && session) {
    console.log(session);
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }

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
      />
    );
  else {
    return (
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <Header />
          <Overview overviewData={overviewData} />
          <ApplicationsTable
            data={data}
            setDetailViewData={setDetailViewData}
            setShowDetailView={setShowDetailView}
          />
        </main>
      </div>
    );
  }
}

Index.Layout = MainLayout;
