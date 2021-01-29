import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
      <div className="lg:hidden">
        <div className="fixed inset-0 flex z-40">
          {/* <!--
        Off-canvas menu overlay, show/hide based on off-canvas menu state.

        Entering: "transition-opacity ease-linear duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "transition-opacity ease-linear duration-300"
          From: "opacity-100"
          To: "opacity-0"
      --> */}
          <div className="fixed inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-600 opacity-75"></div>
          </div>
          {/* <!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      --> */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Close sidebar</span>
                {/* <!-- Heroicon name: x --> */}
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex-shrink-0 flex items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-purple-500-mark-gray-700-text.svg"
                alt="Workflow"
              />
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2">
                <div className="space-y-1">
                  {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" --> */}
                  <a
                    href="#"
                    className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                    aria-current="page"
                  >
                    {/* <!-- Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" -->
                <!-- Heroicon name: home --> */}
                    <svg
                      className="text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Home
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                  >
                    {/* <!-- Heroicon name: view-list --> */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                    My tasks
                  </a>

                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                  >
                    {/* <!-- Heroicon name: clock --> */}
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Recent
                  </a>
                </div>
                <div className="mt-8">
                  <h3
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="teams-headline"
                  >
                    Teams
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    role="group"
                    aria-labelledby="teams-headline"
                  >
                    <a
                      href="#"
                      className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span
                        className="w-2.5 h-2.5 mr-4 bg-indigo-500 rounded-full"
                        aria-hidden="true"
                      ></span>
                      <span className="truncate">Engineering</span>
                    </a>

                    <a
                      href="#"
                      className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span
                        className="w-2.5 h-2.5 mr-4 bg-green-500 rounded-full"
                        aria-hidden="true"
                      ></span>
                      <span className="truncate">Human Resources</span>
                    </a>

                    <a
                      href="#"
                      className="group flex items-center px-3 py-2 text-base leading-5 font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                    >
                      <span
                        className="w-2.5 h-2.5 mr-4 bg-yellow-500 rounded-full"
                        aria-hidden="true"
                      ></span>
                      <span className="truncate">Customer Success</span>
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
          </div>
        </div>
      </div>

      {/* <!-- Static sidebar for desktop --> */}
      <Sidebar />

      {children}
    </div>
  );
}
