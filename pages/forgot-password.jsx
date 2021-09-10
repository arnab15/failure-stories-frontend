import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../context/AuthContextProvider";
import authService from "../services/authService";

export default function ForgotPassword() {
  const [isRequestSent, setisRequestSent] = useState(false);
  const router = useRouter();
  const { setCurrentUser, currentUser, authLoading } = useAuth();
  //   if (currentUser) {
  //     if (typeof window !== "undefined") {
  //       if (router.query && router.query.from) {
  //         const allquery = {
  //           ...router.query,
  //         };
  //         delete allquery.from;
  //         console.log("login query----", allquery);
  //         router.replace(
  //           {
  //             pathname: router.query.from,
  //             query: {
  //               ...allquery,
  //             },
  //           },
  //           undefined,
  //           { shallow: true }
  //         );
  //         return null;
  //       }
  //       router.replace("/");
  //       return null;
  //     }
  //   }
  const handelFormSubmit = async (values, actions) => {
    try {
      const { email } = values;
      actions.setSubmitting(true);
      await authService.forgotPassword({
        email,
      });
      actions.setSubmitting(false);
      actions.resetForm();
      setisRequestSent(true);
      console.log("email", email);
    } catch (error) {
      setisRequestSent(true);
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Required"),
  });

  return (
    <Flex
      minH="100vh"
      align="flex-start"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={6}
        mx="auto"
        maxW="lg"
        py={12}
        px={6}
        minWidth={["", "md"]}
      >
        <Stack align="center">
          <Heading fontSize={["2xl", "4xl"]}>Forgot Password</Heading>
        </Stack>
        {!isRequestSent ? (
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="md"
            p={8}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handelFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleSubmit,
                handleChange,
                setFieldTouched,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl id="email" isInvalid={errors.email}>
                      <FormLabel>Email address</FormLabel>
                      <Input
                        name="email"
                        value={values.email}
                        type="email"
                        onChange={handleChange}
                        onBlur={setFieldTouched}
                      />
                      {(errors.email || touched.email) && (
                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                      )}
                    </FormControl>
                    <Stack spacing={4}>
                      <Button
                        isLoading={isSubmitting}
                        type="submit"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: "blue.500",
                        }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
        ) : (
          <Text>
            If your email matches you will recive a email with reset password
            link click that link to reset password
          </Text>
        )}
      </Stack>
    </Flex>
  );
}
