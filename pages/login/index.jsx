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
import dynamic from "next/dynamic";
import jwtDecode from "jwt-decode";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContextProvider";
import LoginWithGoogle from "../../Components/LoginWithGoogle/LoginWithGoogle";

function Login() {
  const { setCurrentUser, currentUser } = useAuth();
  const router = useRouter();

  if (currentUser) {
    if (typeof window !== "undefined") {
      if (router.query && router.query.from) {
        const allquery = {
          ...router.query,
        };
        delete allquery.from;
        console.log("login query----", allquery);
        router.replace(
          {
            pathname: router.query.from,
            query: {
              ...allquery,
            },
          },
          undefined,
          { shallow: true }
        );
        return null;
      }
      router.replace("/");
      return null;
    }
  }
  const handelFormSubmit = async (values, actions) => {
    try {
      const { password, email } = values;
      const { data } = await authService.login({ password, email });
      localStorage.setItem("_accessToken", data.accessToken);

      try {
        const userData = jwtDecode(data.accessToken);
        setCurrentUser(userData);
      } catch (error) {
        console.log("error", error);
        router.replace("/");
      }
      actions.setSubmitting(false);
      actions.resetForm();

      if (router.query && router.query.from && router.query.from !== "/login") {
        // router.replace(router.query.from);
        window.location.pathname = router.query.from;
      }
    } catch (error) {
      actions.setSubmitting(false);
      actions.setFieldError("email", "Incorrect email or password");
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string().trim().email().required("Required"),
    password: Yup.string().trim().min(6).required("Required"),
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
            <LoginWithGoogle />
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
                      Sign in
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
              <Text pr="0.5">Don't have an account?</Text>

              <Link as={NextLink} href="/signup">
                <Text cursor="pointer" color="blue.400">
                  Sign Up
                </Text>
              </Link>
            </Flex>
          </Stack>
          <Box my="2">
            <Link as={NextLink} href="/forgot-password">
              <Text cursor="pointer" color="blue.400">
                Forgot Password ?
              </Text>
            </Link>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}

export default dynamic(() => Promise.resolve(Login), {
  ssr: false,
});
