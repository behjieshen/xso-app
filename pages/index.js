import MainLayout from "../layout/MainLayout";
import Status from "../components/Status";
import { useSession } from "next-auth/client";
import Router from "next/router";

export default function Index() {
  const [session, loading] = useSession();

  // Redirect user to home page for non-admins
  if (!loading && session) {
    if (session.dbUser.role === "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "/admin");
    }
  }

  // Display null while redirecting
  if (
    !loading &&
    session.dbUser.role === "ADMIN"
  ) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <main
        className="flex-1 relative z-0 overflow-y-auto focus:outline-none"
        tabIndex="0"
      >
        {/* <!-- Page title & actions --> */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Home
            </h1>
          </div>
        </div>
        <Status />
      </main>
    </div>
  );
}

Index.Layout = MainLayout;
