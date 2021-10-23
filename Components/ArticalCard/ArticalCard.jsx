/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import {
  Badge,
  Box,
  Flex,
  Image,
  Text,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";

import { readTime } from "../../utils/calculateReadTime";
import { getFirstDescription } from "../../utils/helpers";

import { useBookmarkStory } from "../../hooks/stories/useBookmarkStory";

dayjs.extend(relativeTime);
function ArticalCard({ story, showBookmarkOption = true }) {
  const { colorMode } = useColorMode();
  const { bookmarkAStory, currentUser, bookmarkedPosts } =
    useBookmarkStory(story);

  const { blocks } = JSON.parse(story.story);
  // const day = new Date(story.updatedAt).getDate();
  // const month = new Date(story.updatedAt).toLocaleString("en-IN", {
  //   month: "short",
  // });
  console.log("storyyyy", story);
  const readingTime = readTime(JSON.parse(story.story).blocks);

  const addStoryToBookmark = async (id) => {
    await bookmarkAStory(id);
  };

  return (
    blocks.length > 0 && (
      <Link href={`/story/${story._id}`}>
        <Box
          maxWidth={["100%", "720"]}
          overflow="hidden"
          borderRadius="lg"
          boxShadow="lg"
          cursor="pointer"
          p="1.5"
        >
          <Flex direction="row">
            {/* <Box width={125}>
              <Image
                boxSize="100%"
                height="100%"
                minWidth="125px"
                maxWidth="125px"
                objectFit="cover"
                src={
                  getFirstImage(blocks)
                    ? getFirstImage(blocks)
                    : "https://picsum.photos/300/300.jpg"
                }
              />
            </Box> */}

            <Flex
              width="100%"
              direction="column"
              px="1.5"
              pb="0.5"
              justifyContent="space-evenly"
            >
              <Box pb="0.5">
                <Flex justifyContent="space-between">
                  <Box my="0.5">
                    <Flex direction="row" alignItems="center">
                      <Box>
                        <Image
                          rounded="full"
                          height={["6", "8"]}
                          width={["6", "8"]}
                          // src="https://i.pravatar.cc/300"
                          src={
                            story.postAnonomusly || !story.author.profilePic
                              ? `https://avatars.dicebear.com/api/avataaars/${story.author.name}.svg`
                              : story.author.profilePic
                          }
                        />
                      </Box>
                      <Box pl="1.5">
                        <Flex direction="column">
                          <Text
                            fontWeight="semibold"
                            fontSize={["x-small", "sm"]}
                          >
                            {story.postAnonomusly
                              ? "Unknown"
                              : story.author.name.split(" ")[0]}
                          </Text>
                          <Text fontSize="x-small">
                            {dayjs(dayjs(story.updatedAt)).fromNow()}
                          </Text>
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>

                  {showBookmarkOption && (
                    <Box>
                      <Tooltip label="Bookmark Story">
                        <Box
                          w="5"
                          h="4"
                          color={
                            currentUser &&
                            (bookmarkedPosts.includes(story._id) ||
                              story.bookmarkedBy?.includes(currentUser.userId))
                              ? "orange.400"
                              : "gray.600"
                          }
                          _hover={{ color: "orange.400" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addStoryToBookmark(story._id);
                          }}
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </Box>
                      </Tooltip>
                    </Box>
                  )}
                </Flex>
              </Box>
              {/* <Box>
                <Text
                  as="h3"
                  fontSize="small"
                  fontWeight="semibold"
                  color={colorMode === "dark" ? "gray.100" : "gray.700"}
                  noOfLines={2}
                >
                  {getFirstHeader(blocks)}
                </Text>
              </Box> */}

              {getFirstDescription(blocks) && (
                <Box pt="1">
                  <Text as="p" fontSize={["sm", "md"]} noOfLines={3}>
                    {getFirstDescription(blocks)}
                  </Text>
                </Box>
              )}
              <Flex justifyContent="space-between" mt="2.5" mb="1">
                <Flex>
                  {story.tags?.map((tag) => (
                    <Badge
                      rounded="sm"
                      colorScheme="gray"
                      fontSize="x-small"
                      mr="1.5"
                    >
                      <Text p="0.5">{`${tag.emoji} ${tag.title}`}</Text>
                    </Badge>
                  ))}
                </Flex>
                <Box>
                  <Text fontWeight="semibold" fontSize="x-small">
                    {readingTime.text}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Link>
    )
  );
}

export default ArticalCard;
