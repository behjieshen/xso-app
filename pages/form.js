import MainLayout from "../layout/MainLayout";
import XSOForm from "../components/XSOForm";
import { useRouter } from "next/router";
import { useCurrentUser } from "../hooks/index";

export default function Form({ setSideBarVisible }) {
  const router = useRouter();
  const [user] = useCurrentUser();
  
  if (user && user.role != "NEW USER") {
    router.push("/");
  }

  return (
    <div className="flex flex-col w-0 flex-1 overflow-hidden">
      {/* <!-- Search header --> */}

      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabIndex="0">
        {/* <!-- Page title & actions --> */}
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
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Application</h1>
          </div>
        </div>
        <XSOForm />
      </main>
    </div>
  );
}

Form.Layout = MainLayout;
