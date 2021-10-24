import React from "react";
import NextLink from "next/link";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/dist/client/router";
import jwtDecode from "jwt-decode";
import { useAuth } from "../../context/AuthContextProvider";
import authService from "../../services/authService";
import LoginWithGoogle from "../../Components/LoginWithGoogle/LoginWithGoogle";

export default function Signup() {
  const { setCurrentUser, currentUser } = useAuth();
  const router = useRouter();
  if (currentUser) {
    router.replace("/home");
    return null;
  }
  const handelFormSubmit = async (values, actions) => {
    console.log("values", values);
    try {
      const { password, email, name } = values;
      const { data } = await authService.signup({ name, password, email });
      console.log("data", data);
      localStorage.setItem("_accessToken", data.accessToken);
      try {
        const userData = jwtDecode(data.accessToken);
        setCurrentUser(userData);
      } catch (error) {
        console.log("error", error);
        router.replace("/home");
      }
      actions.setSubmitting(false);
      actions.resetForm();

      if (router.query && router.query.from) {
        router.replace(router.query.from);
      }
    } catch (error) {
      actions.setSubmitting(false);
      actions.setFieldError("email", "Incorrect email or password");
    }
  };
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().min(3).required("Required"),
    email: Yup.string().trim().email().required("Required"),
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
      <Stack
        spacing={6}
        mx="auto"
        maxW="lg"
        py={12}
        px={6}
        minWidth={["", "md"]}
      >
        <Stack align="center">
          <Heading fontSize={["2xl", "4xl"]}>Sign in</Heading>
        </Stack>
        <Box
          rounded="lg"
          bg={useColorModeValue("white", "gray.700")}
          boxShadow="md"
          p={8}
        >
          <Box w="100%" mx="auto" my="2">
            <LoginWithGoogle buttonText="Signup With Google" />
          </Box>
          <Flex alignItems="center" my="4">
            <Divider />
            <Text mx="2.5">OR</Text>
            <Divider />
          </Flex>

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
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl
                    id="name"
                    isInvalid={touched.name && errors.name}
                  >
                    <FormLabel>Your Name</FormLabel>
                    <Input
                      name="name"
                      value={values.name}
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="email"
                    isInvalid={touched.email && errors.email}
                  >
                    <FormLabel>Email address</FormLabel>
                    <Input
                      name="email"
                      value={values.email}
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="password"
                    isInvalid={touched.password && errors.password}
                  >
                    <FormLabel>Password</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.password && errors.password && (
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
                    )}
                  </FormControl>
                  <FormControl
                    id="confirmPassword"
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
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
                      Sign Up
                    </Button>
                  </Stack>
                </Stack>
              </form>
            )}
          </Formik>

          <Stack
            direction={{ base: "column" }}
            align="start"
            justify="space-between"
          >
            {/* <Link color="blue.400">Forgot password?</Link> */}
            <Flex>
              <Text pr="0.5">Do have an account?</Text>

              <Link as={NextLink} href="/login">
                <Text cursor="pointer" color="blue.400">
                  Login
                </Text>
              </Link>
            </Flex>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
