/* eslint-disable react/prop-types */
import { Text } from "@chakra-ui/react";
import React from "react";
import { decode } from "html-entities";

function ParagraphParser({ block }) {
  return (
    <>
      {block.type === "paragraph" && (
        <Text
          as="p"
          my="4"
          fontSize={["16px", "21px"]}
          fontWeight="400"
          lineHeight={["26px", "30px"]}
          dangerouslySetInnerHTML={{ __html: decode(block.data.text) }}
        >
          {/* {decode(block.data.text)} */}
        </Text>
      )}
    </>
  );
}

export default ParagraphParser;
