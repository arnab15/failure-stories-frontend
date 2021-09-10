import React, { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";
import { useAuth } from "../../context/AuthContextProvider";
import authService from "../../services/authService";

function ResetPassword() {
  const [isValidCredentials, setisValidCredentials] = useState(false);
  const router = useRouter();
  const { setCurrentUser, currentUser, authLoading } = useAuth();

  const validateCredentials = async ({ resetToken, userId }) => {
    if (resetToken && userId) {
      try {
        const { data } = await authService.validateForgotPasswordCredentials({
          token: resetToken,
          userId,
        });
        if (data.verified) return setisValidCredentials(true);
      } catch (error) {
        return router.replace("/forgot-password");
      }
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { resetToken, userId } = router.query;
      if (
        (!resetToken && userId) ||
        (resetToken === "undefined" && userId === "undefined")
      )
        return router.replace("/forgot-password");
      validateCredentials({
        resetToken,
        userId,
      });
      console.log("params", router.query);
    }
  }, [router.query]);
  const handelFormSubmit = async (values, actions) => {
    try {
      const { password, confirmPassword } = values;
      console.log({ password, confirmPassword });
      const { resetToken, userId } = router.query;
      await authService.resetPassword({
        password,
        token: resetToken,
        userId,
      });
      actions.setSubmitting(false);
      actions.resetForm();
      router.replace("/login");
    } catch (error) {
      actions.setSubmitting(false);
      router.replace("/forgot-password");
    }
  };
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    password: Yup.string().trim().min(6).required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .trim()
      .min(6)
      .required("Required"),
  });

  return (
    <Flex
      minH="100vh"
      align="flex-start"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {isValidCredentials ? (
        <Stack
          spacing={6}
          mx="auto"
          maxW="lg"
          py={12}
          px={6}
          minWidth={["", "md"]}
        >
          <Stack align="center">
            <Heading fontSize={["2xl", "4xl"]}>Change Password</Heading>
          </Stack>
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
                    <FormControl id="password" isInvalid={errors.password}>
                      <FormLabel>Password</FormLabel>
                      <Input
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={setFieldTouched}
                      />
                      {(errors.password || touched.password) && (
                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                      )}
                    </FormControl>
                    <FormControl
                      id="confirmPassword"
                      isInvalid={errors.confirmPassword}
                    >
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={setFieldTouched}
                      />
                      {(errors.confirmPassword || touched.confirmPassword) && (
                        <FormErrorMessage>
                          {errors.confirmPassword}
                        </FormErrorMessage>
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
                        Change Password
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              )}
            </Formik>
          </Box>
        </Stack>
      ) : (
        <Text>Validating...</Text>
      )}
    </Flex>
  );
}
export default dynamic(() => Promise.resolve(ResetPassword), {
  ssr: false,
});
