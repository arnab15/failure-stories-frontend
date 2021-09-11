/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Badge, Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { readTime } from "../../utils/calculateReadTime";
import {
  getFirstDescription,
  getFirstHeader,
  getFirstImage,
} from "../../utils/helpers";

function ArticalCard({ story }) {
  const { blocks } = JSON.parse(story.story);
  const day = new Date(story.updatedAt).getDate();
  const month = new Date(story.updatedAt).toLocaleString("en-IN", {
    month: "short",
  });
  const readingTime = readTime(JSON.parse(story.story).blocks);
  return (
    blocks.length > 0 && (
      <Link href={`/story/${story._id}`}>
        <Box
          maxWidth={["100%", "720"]}
          overflow="hidden"
          borderRadius="lg"
          boxShadow="sm"
          cursor="pointer"
        >
          <Flex direction="row" h={["115", "140"]}>
            <Box width={125}>
              <Image
                boxSize="100%"
                height="100%"
                minWidth="125px"
                maxWidth="125px"
                objectFit="cover"
                src={
                  getFirstImage(blocks)
                    ? getFirstImage(blocks)
                    : "https://picsum.photos/300/300"
                }
              />
            </Box>

            <Flex
              width="100%"
              direction="column"
              px="1.5"
              pb="0.5"
              justifyContent="space-evenly"
            >
              <Box pb="0.5">
                <Badge rounded="sm" colorScheme="red" fontSize="x-small">
                  <Text p="0.5">Rejected in Career</Text>
                </Badge>
              </Box>
              <Box>
                <Text
                  as="h3"
                  fontSize="small"
                  fontWeight="semibold"
                  color="gray.700"
                  noOfLines={2}
                >
                  {getFirstHeader(blocks)}
                </Text>
              </Box>

              {getFirstDescription(blocks) && (
                <Box pt="1">
                  <Text as="p" fontSize="xs" noOfLines={1}>
                    {getFirstDescription(blocks)}
                  </Text>
                </Box>
              )}

              <Box pt="1.5">
                <Flex
                  px="1.5"
                  pb="1"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Flex
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box>
                        <Image
                          rounded="full"
                          height="4"
                          width="4"
                          // src="https://i.pravatar.cc/300"
                          src={
                            !story.author.profilePic
                              ? `https://avatars.dicebear.com/api/avataaars/${story.author.name}.svg`
                              : story.author.profilePic
                          }
                        />
                      </Box>
                      <Box pl="1">
                        <Text
                          fontWeight="semibold"
                          color="gray.600"
                          fontSize="x-small"
                        >
                          {story.author.name}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Text
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="x-small"
                    >
                      {`${day} ${month}`}
                    </Text>
                  </Box>
                  <Box>
                    <Text
                      fontWeight="semibold"
                      color="gray.600"
                      fontSize="x-small"
                    >
                      {readingTime.text}
                    </Text>
                  </Box>
                  <Box>
                    <Box w="4" h="4" color="gray.600">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Link>
    )
  );
}

export default ArticalCard;
