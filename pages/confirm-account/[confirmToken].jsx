/* eslint-disable global-require */
// eslint-disable-next-line import/no-extraneous-dependencies

import { useToast, Box } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import authService from "../../services/authService";

function ConfirmAccount() {
  const router = useRouter();
  const toast = useToast();

  const confirmAcoountConfirmToken = async (token) => {
    try {
      await authService.confirmAccountCreation(token);
      toast({
        title: "Email verified successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      router.replace("/");
    } catch (error) {
      // router.replace("/signup");
      if (error.response.status === 409) {
        console.log("err in");
        toast({
          title: error.response.data.message,
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        router.replace("/");
        return;
      }

      toast({
        title: "Unable to verify your email, please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      router.replace("/signup");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("query", router.query.confirmToken);

      if (router.query.confirmToken) {
        if (
          !router.query.confirmToken.match(
            /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
          )
        ) {
          return router.replace("/signup");
        }
        confirmAcoountConfirmToken(router.query.confirmToken);
      }
    }
  }, [router.query]);
  return <Box>Verifying your account</Box>;
}

// export async function getServerSideProps(context) {
//   const axios = require("axios");
//   const { params } = context;
//   if (!params.confirmToken) {
//     return {
//       redirect: {
//         destination: "/signup",
//         permanent: false,
//       },
//     };
//   }

//   if (
//     !params.confirmToken.match(
//       /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
//     )
//   ) {
//     return {
//       redirect: {
//         destination: "/signup",
//         permanent: false,
//       },
//     };
//   }

//   try {
//   //   {
//   // method: 'POST', // or 'PUT'
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // }
//     await fetch(url,)
//     const res = await fetch(`${process.env.baseUrl}/stories`);
//     const data = await res.json();
//   } catch (error) {
//     return {
//       redirect: {
//         destination: "/signup",
//         permanent: false,
//       },
//     };
//   }
//   console.log(context.params.confirmToken);

//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }
export default dynamic(() => Promise.resolve(ConfirmAccount), {
  ssr: false,
});
