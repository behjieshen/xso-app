import { Transition } from "@headlessui/react";
import { useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "../hooks";
import { signOut } from "next-auth/client";

export default function MobileSideBar({ image, name, sideBarVisible, setSideBarVisible }) {
  const [user, { mutate }] = useCurrentUser();
  const onSignout = () => {
    mutate(null, false);
    signOut({ callbackUrl: process.env.NEXTAUTH_URL });
  };

  return (
    <div className={`lg:hidden ${!sideBarVisible ? "hidden" : null}`}>
      <div className={`fixed inset-0 flex z-40`}>
        {/* <!--
      Off-canvas menu overlay, show/hide based on off-canvas menu state.
  
      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
        <Transition
          show={sideBarVisible}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0"
        >
          <div
            className="absolute inset-0 bg-gray-600 opacity-75"
            onClick={() => setSideBarVisible(false)}
          ></div>
        </Transition>
        {/* <div className="fixed inset-0" aria-hidden="true">
            
          </div> */}
        {/* <!--
      Off-canvas menu, show/hide based on off-canvas menu state.
  
      Entering: "transition ease-in-out duration-300 transform"
        From: "-translate-x-full"
        To: "translate-x-0"
      Leaving: "transition ease-in-out duration-300 transform"
        From: "translate-x-0"
        To: "-translate-x-full"
    --> */}
        <Transition
          show={sideBarVisible}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-full"
          leaveTo="-translate-x-0"
          className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              onClick={() => setSideBarVisible(false)}
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
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
            <img className="h-12 w-auto" src="/images/xoogler-logo.png" alt="Workflow" />
            <span className={`${sideBarVisible ? null : "hidden"} ml-3 font-bold text-xl`}>
              Xoogler School
            </span>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto flex flex-col justify-between">
            <nav className="px-2 mt-5">
              <div className="space-y-1">
                {/* <!-- Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:text-gray-900 hover:bg-gray-50" --> */}
                <Link href="/">
                  <a
                    onClick={() => setSideBarVisible(!sideBarVisible)}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                  >
                    {/* <!-- Heroicon name: logout --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
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
                </Link>
                {user && user.role == "NEW USER" ? (
                  <Link href="/form">
                    <a
                      onClick={() => setSideBarVisible(!sideBarVisible)}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                    >
                      {/* <!-- Heroicon name: logout --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Apply
                    </a>
                  </Link>
                ) : (
                  <Link href="/review">
                    <a
                      onClick={() => setSideBarVisible(!sideBarVisible)}
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                    >
                      {/* <!-- Heroicon name: logout --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      View Application
                    </a>
                  </Link>
                )}

                <a
                  href="#"
                  onClick={() => onSignout()}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                >
                  {/* <!-- Heroicon name: logout --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6 ml-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </a>
              </div>
            </nav>
            <div className="flex flex-col items-center mb-5">
              <span className="px-2 block text-xs text-gray-400">Currently logged in as</span>
              <span className="flex w-full justify-center items-center px-2 mt-4">
                <span className="flex min-w-0 items-center justify-between space-x-3">
                  <img
                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                    src={image}
                    alt=""
                  />
                  <span className="flex-1 min-w-0">
                    <span className="text-gray-900 text-sm font-medium truncate">{name}</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </Transition>
        {/* <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"></div> */}
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* <!-- Dummy element to force sidebar to shrink to fit close icon --> */}
        </div>
      </div>
    </div>
  );
}
