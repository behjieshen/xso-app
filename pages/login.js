import { signIn, signOut, useSession } from "next-auth/client";
import Router from "next/router";

export default function Login() {
  const [session] = useSession();

  // if (session) Router.push("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <img
            className="mx-auto h-32 w-auto"
            src="/images/xoogler-logo.png"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Xoogler School Online
          </h2>
        </div>
        {!session ? (
          <div className="flex justify-center">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full group relative flex justify-center py-3 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
          <button
            onClick={() => signOut("google")}
            className="w-full group relative flex justify-center py-3 px-8 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="h-5 w-5 text-indigo-300 group-hover:text-indigo-400 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            Sign out
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
