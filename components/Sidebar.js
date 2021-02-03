import { useState } from "react";
import { Transition } from "@headlessui/react";
import { signOut } from "next-auth/client";
import { useCurrentUser } from "../hooks/index";

export default function Sidebar({ image, name }) {
  const [settingVisible, setSettingVisible] = useState(false);
  const [sideNavVisible, setSideNavVisible] = useState(true);
  const [_, { mutate }] = useCurrentUser();
  const onSignout = () => {
    mutate(null, false);
    signOut({ callbackUrl: process.env.SIGN_OUT_URL });
  };

  return (
    <Transition
      show={true}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
      className="hidden lg:flex lg:flex-shrink-0 sticky top-0 h-screen"
    >
      {/* <div className="hidden lg:flex lg:flex-shrink-0 sticky top-0 h-screen"> */}
      <div
        className={`${
          sideNavVisible ? null : "items-center"
        } flex flex-col border-r border-gray-200 pt-5 pb-4 bg-gray-100`}
      >
        <div className="flex items-center flex-shrink-0 px-4">
          <img
            className="h-10 w-auto"
            src="/images/xoogler-logo.png"
            alt="Workflow"
          />
          <span
            className={`${sideNavVisible ? null : "hidden"} ml-3 font-bold`}
          >
            Xoogler School
          </span>
          <svg
            className={`${
              sideNavVisible ? null : "hidden"
            } flex-shrink-0 h-5 w-5 text-gray-400 hover:text-gray-500 ml-5 cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setSideNavVisible(!sideNavVisible)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <svg
          className={`${
            !sideNavVisible ? null : "hidden"
          } flex-shrink-0 h-6 w-6 mt-5 text-gray-500 group-hover:text-gray-500 cursor-pointer`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => setSideNavVisible(!sideNavVisible)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          {/* <!-- User account dropdown --> */}
          <div className="px-3 mt-6 relative inline-block text-left">
            {/* <!-- Dropdown menu toggle, controlling the show/hide state of dropdown menu. --> */}
            <div>
              <button
                type="button"
                className={`${
                  sideNavVisible ? null : "hidden"
                } group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500`}
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                onClick={() => setSettingVisible(!settingVisible)}
              >
                <span className="flex w-full justify-between items-center">
                  <span className="flex min-w-0 items-center justify-between space-x-3">
                    <img
                      className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                      src={image}
                      alt=""
                    />
                    <span className="flex-1 min-w-0">
                      <span className="text-gray-900 text-sm font-medium truncate">
                        {name}
                      </span>
                    </span>
                  </span>
                  {/* <!-- Heroicon name: selector --> */}
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* <!--
            Dropdown panel, show/hide based on dropdown state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
            <Transition
              show={settingVisible}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
              className="z-50 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {/* <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    View profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Notifications
                  </a>
                </div> */}
              <div className="py-1">
                <a
                  onClick={() => onSignout()}
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Logout
                </a>
              </div>
            </Transition>
          </div>

          {/* <!-- Navigation --> */}

          <nav className="px-3 mt-6">
            <div className="space-y-1">
              {/* <!-- Current: "bg-gray-200 text-gray-900", Default: "text-gray-700 hover:text-gray-900 hover:bg-gray-50" --> */}
            </div>
          </nav>
        </div>
      </div>
    </Transition>
  );
}
