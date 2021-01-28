import React from "react";
import { Provider } from "next-auth/client";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
