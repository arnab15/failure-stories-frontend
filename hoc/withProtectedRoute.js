/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useAuth } from "../context/AuthContextProvider";

const withProtectedRoute = (Component) => (props) => {
  const { currentUser } = useAuth();
  const router = useRouter();
  console.log("router--------", router.pathname);
  console.log("routerquery--------", router.query);
  console.log("currentuser---", currentUser);

  if (typeof window !== "undefined") {
    if (!currentUser) {
      router.push({
        pathname: "/login",
        query: { from: router.asPath },
      });
      return null;
    }
    return (
      <>
        <Component {...props} />
      </>
    );
  }
};

export default withProtectedRoute;
