import MainLayout from "../layout/MainLayout";
import Status from "../components/Status";
import { useSession } from "next-auth/client";
import Router from "next/router";

export default function Index({ setSideBarVisible }) {
  const [session, loading] = useSession();

  // Redirect user to admin page for admins
  if (!loading && session) {
    if (session.dbUser.role === "ADMIN") {
      Router.push(process.env.NEXTAUTH_URL + "admin");
    }
  }

  // Display null while redirecting
  if (!loading && session.dbUser.role === "ADMIN") {
    return <></>;
  }

  // Else show the main home page for non-admins
  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
        {/* Home page top bar */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-gray-700 group-hover:text-gray-500 mr-3 h-6 w-6 block lg:hidden"
              onClick={() => setSideBarVisible(true)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Home</h1>
          </div>
        </div>
        {/* Application Status Component */}
        <Status />
      </main>
    </div>
  );
}

Index.Layout = MainLayout;
