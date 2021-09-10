/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContextProvider";

const withProtectedRoute = (Component) => (props) => {
  const { currentUser, authLoading } = useAuth();
  const router = useRouter();
  console.log("router--------", router.pathname);
  console.log("routerquery--------", router.query);
  console.log("currentuser---", currentUser);
  if (typeof window !== "undefined") {
    if (!authLoading && currentUser) {
      return (
        <>
          <Component {...props} />
        </>
      );
    }
    router.push({
      pathname: "/login",
      query: { from: router.pathname },
    });
    return null;
  }
  return null;

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (!isAuthenticated && !currentUser && !authLoading) {
  //       console.log("restq---", router.query);
  //       router.replace({
  //         pathname: "/login",
  //         query: { from: router.pathname },
  //       });
  //       return null;
  //     }
  //   }
  // }, [router.query, router.pathname]);
};

export default withProtectedRoute;
