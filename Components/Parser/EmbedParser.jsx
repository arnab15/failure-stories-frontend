/* eslint-disable react/prop-types */
import { Box, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

function EmbedParser({ block }) {
  const value = useBreakpointValue({ base: "100%", md: block.data.width });

  return (
    <>
      {block.type === "embed" && (
        <Box mx="auto" p="2">
          <iframe
            width={value}
            height={block.data.height}
            src={block.data.embed}
            title={block.data.service}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      )}
    </>
  );
}

export default EmbedParser;
