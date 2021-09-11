/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import React from "react";

import Navbar from "../Navbar/NavBar";

function Layout({ children }) {
  return (
    <Box>
      <Navbar>
        <Box mt="65px">{children}</Box>
      </Navbar>
    </Box>
  );
}

export default Layout;
