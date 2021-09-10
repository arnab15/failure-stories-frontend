/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import React from "react";

import Navbar from "../Navbar/NavBar";

function Layout({ children }) {
  return (
    <Box>
      <Navbar>{children}</Navbar>
    </Box>
  );
}

export default Layout;
