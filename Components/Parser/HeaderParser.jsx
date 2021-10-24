/* eslint-disable react/prop-types */
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { decode } from "html-entities";

function HeaderParser({ block }) {
  return (
    <>
      {block && block.data.level === 1 && (
        <Box>
          <Text
            my="4"
            as="h1"
            fontSize={["30px", "40px"]}
            fontWeight="600"
            lineHeight={["30px", "50px"]}
            dangerouslySetInnerHTML={{ __html: decode(block.data.text) }}
          >
            {/* {decode(block.data.text)} */}
          </Text>
        </Box>
      )}
      {block && block.data.level === 2 && (
        <Box>
          <Text
            my="4"
            as="h2"
            fontSize={["25px", "35px"]}
            fontWeight="400"
            lineHeight={["26px", "46px"]}
          >
            {decode(block.data.text)}
          </Text>
        </Box>
      )}
      {block && block.data.level === 3 && (
        <Box>
          <Text
            my="4"
            as="h3"
            fontSize={["22px", "32px"]}
            fontWeight="300"
            lineHeight={["22px", "42px"]}
          >
            {decode(block.data.text)}
          </Text>
        </Box>
      )}
    </>
  );
}

export default HeaderParser;
