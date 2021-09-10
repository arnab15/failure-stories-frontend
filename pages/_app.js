/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import Router from "next/router";
import Nprogress from "nprogress";
import Layout from "../Components/Layout/Layout";
import AuthContextProvider from "../context/AuthContextProvider";
import "nprogress/nprogress.css";
import "../styles/globals.css";
// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  Nprogress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", (url) => {
    console.log("url changing...", url);
    Nprogress.start();
  });
  Router.events.on("routeChangeComplete", (url) => {
    console.log("url changecomplete...", url);
    Nprogress.done();
  });
  Router.events.on("routeChangeError", () => {
    Nprogress.done();
  });
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <ChakraProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
