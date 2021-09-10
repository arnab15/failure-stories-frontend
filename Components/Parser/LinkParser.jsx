/* eslint-disable react/prop-types */
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

function LinkParser({ block }) {
  console.log("parser", block);
  return (
    <>
      {block && block.type === "linkTool" && (
        <Box my="2">
          <a
            href={block.data.link}
            target="_blank"
            textDecoration="none"
            rel="noreferrer"
          >
            <Flex
              cursor="pointer"
              justify="space-between"
              border="1px solid #B2B1B9"
              shadow="sm"
            >
              <Flex
                direction="column"
                p={["2", "4"]}
                justifyContent="stretch"
                overflow="hidden"
              >
                <Text
                  as="strong"
                  noOfLines={1}
                  fontSize="16px"
                  fontWeight="600"
                  textColor="gray.600"
                >
                  {block.data.meta.title}
                </Text>
                <Text noOfLines={2} textColor="gray.500">
                  {block.data.meta.description}
                </Text>
                <Text noOfLines={1} textColor="gray.400">
                  {block.data.link}
                </Text>
              </Flex>
              <Box>
                <Image
                  objectFit="cover"
                  maxHeight={["130px", "150px"]}
                  maxWidth="160px"
                  src={block.data.meta.image.url}
                />
              </Box>
            </Flex>
          </a>
        </Box>
      )}
    </>
  );
}

export default LinkParser;
