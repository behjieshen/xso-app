import React from "react";
import { Provider } from "next-auth/client";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <Provider
      session={pageProps.session}
      options={{
        clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
        keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
