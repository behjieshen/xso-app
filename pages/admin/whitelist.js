import { useSession } from "next-auth/client";

export default function WhiteList() {
  const [session, loading] = useSession();
  // Redirect user to home page for non-admins
  if (!loading && session) {
    if (session.dbUser.role !== "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/");
    }
  }

  if (
    !loading &&
    session !== typeof "undefined" &&
    session.dbUser.role !== "ADMIN"
  ) {
    return <></>;
  } else {
    return (
      <div className="flex flex-col w-0 flex-1">
        <main
          className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
          tabIndex="0"
        >
          <Header />
          <ApplicationsTable
            data={applicationsData}
            setDetailViewData={setDetailViewData}
            setShowDetailView={setShowDetailView}
            updateOverview={updateOverview}
            updateData={updateData}
            paginationData={paginationData}
          />
        </main>
      </div>
    );
  }
}

WhiteList.Layout = MainLayout;
