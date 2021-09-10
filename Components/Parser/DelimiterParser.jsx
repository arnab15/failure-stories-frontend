/* eslint-disable react/prop-types */
import { Divider } from "@chakra-ui/react";
import React from "react";

function DelimiterParser({ block }) {
  return (
    <>
      {block.type === "delimiter" && (
        <Divider
          border="0"
          borderTop="5px dotted #343A40"
          width="6%"
          my="4"
          mx="auto"
          borderBottomWidth="0px"
        />
      )}
    </>
  );
}

export default DelimiterParser;
