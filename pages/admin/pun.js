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
export default function Index() {
  const [session, loading] = useSession();
  const [summary, setSummary] = useState({
    unlabelled: 0,
    rejected: 0,
    accepted: 0,
    total: 0,
  });
  const [test, setTest] = useState(0);

  const { data, error, mutate } = useSWR("/api/admin/app", {
    revalidateOnFocus: true,
  });
  useEffect(() => {
    if (!data) {
      return;
    }
    console.log(data);
    data.map(async (application) => {
      if (application.status === "ACCEPTED") {
        let testData = test + 1;
        console.log("testData", testData);
        await setSummary({ ...summary, accepted: testData });
        await setTest(testData);
        // console.log(summary);
        console.log("test", test)
      }
      if (application.status === "REJECTED") {
        let testData = test + 1;
        console.log("testData", testData);
        await setSummary({ ...summary, rejected: testData });
        await setTest(testData);
        // console.log(summary);
        console.log("test", test)
      }
      if (application.status === "NEW APPLICATION") {
        await setSummary({ ...summary, unlabelled: summary.unlabelled + 1 });
      }
      await setSummary({ ...summary, total: summary.total + 1 });
    });
    
  }, []);
  if (!loading && session) {
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }
  const [showDetailView, setShowDetailView] = useState(false);
  const [detailViewData, setDetailViewData] = useState(null);
  if (error) return <div>Error Loading Data</div>;
  if (!data) return <Loading />;
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
      <div className="flex flex-col w-0 flex-1">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <Header />
          <Overview overviewData={summary} />
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