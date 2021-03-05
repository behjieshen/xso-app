import Link from "next/link";
import { useCurrentUser } from "../hooks/index";

// Let user view completed application or proceed to form

export default function Status() {
  const [user] = useCurrentUser();
  return (
    <div className="bg-white border border-gray-300 sm:rounded-lg mx-10 mt-10">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Your Application
        </h3>
        <div className="mt-5">
          <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start sm:justify-between">
            <h4 className="sr-only">Visa</h4>
            <div className="sm:flex sm:items-start">
              <img
                className="h-10 w-auto"
                src="/images/xoogler-logo.png"
                alt="Workflow"
              />
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <div className="text-sm font-medium text-gray-900">
                  Xoogler School Application
                </div>
                <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  {user && user.role == "NEW USER" ? (
                    <div>Incomplete</div>
                  ) : (
                    <div>Completed</div>
                  )}

                  <span className="hidden sm:mx-2 sm:inline" aria-hidden="true">
                    &middot;
                  </span>
                  <div className="mt-1 sm:mt-0">Due on 22 July 2021</div>
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 sm:flex-shrink-0">
              {user && user.role == "NEW USER" ? (
                <Link href="/form">
                  <a className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Start the application
                  </a>
                </Link>
              ) : (
                <Link href="/review">
                  <a className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View application
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
