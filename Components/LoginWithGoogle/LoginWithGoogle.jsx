import { Box, Button, Text, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { CheckIcon } from "@chakra-ui/icons";
import jwtDecode from "jwt-decode";
import { loginWithGoogle } from "../../services/authService";
import { useAuth } from "../../context/AuthContextProvider";

function LoginWithGoogle({ buttonText = "Login with Google" }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useAuth();
  const onLoginFail = (resp) => {
    console.log("failed resp", resp);
  };
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      setIsLoading(true);
      const { data } = await loginWithGoogle(response.tokenId);
      localStorage.setItem("_accessToken", data.accessToken);
      const decodedData = jwtDecode(data.accessToken);
      setCurrentUser(decodedData);
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      console.log("err", error);
      setIsLoading(false);
    }
  };
  return (
    <Box>
      <GoogleLogin
        clientId="80080215908-8enqap2vv7crkvr1g58p42o8nik5efr7.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={onLoginFail}
        cookiePolicy="single_host_origin"
        render={(renderProps) => (
          <Button
            isLoading={isLoading}
            width="100%"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            px="4"
            py="2"
            mt="4"
            colorScheme="gray"
            _focus={{ outline: "none" }}
          >
            <Text as="span" display="inline-block" mr="4">
              <Image src="./googleicon.svg" w="6" h="6" />
            </Text>
            <Text as="span" display="inline-block">
              {buttonText}
            </Text>
          </Button>
        )}
        // render={(renderProps) => (
        //   <div>
        //     <Button
        //       px="4"
        //       py="2"
        //       mt="4"
        //       colorScheme="gray"
        //       onClick={renderProps.onClick}
        //       disabled={renderProps.disabled}
        //     >
        //       <Box mx="4" display="inline-block">
        //         <GoogleLogo />
        //       </Box>
        //       <Box>{buttonText}</Box>
        //     </Button>
        //   </div>
        // )}
      />
    </Box>
  );
}

export default LoginWithGoogle;
