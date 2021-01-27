import "../styles/globals.css";
import React from "react";
function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
