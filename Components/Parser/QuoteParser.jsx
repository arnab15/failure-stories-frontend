/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { decode } from "html-entities";

function QuoteParser({ block }) {
  return (
    <>
      {block.type === "quote" && (
        <Box borderLeft="3px solid gray" my="4">
          <Text fontSize="22px" fontWeight="500" paddingLeft="2">
            &#8220; {decode(block.data.text)} &#8221;
            {block.data.caption && ` - ${decode(block.data.caption)}`}
          </Text>
        </Box>
      )}
    </>
  );
}

export default QuoteParser;
