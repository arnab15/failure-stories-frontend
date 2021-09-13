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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { readTime } from "../../utils/calculateReadTime";
import {
  getFirstDescription,
  getFirstHeader,
  getFirstImage,
} from "../../utils/helpers";
import { useAuth } from "../../context/AuthContextProvider";
import storiesService from "../../services/storiesService";

function ArticalCard({ story }) {
  const { currentUser } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [bookmarkedPosts, setBookMarkedPosts] = useState([]);
  const { blocks } = JSON.parse(story.story);
  const day = new Date(story.updatedAt).getDate();
  const month = new Date(story.updatedAt).toLocaleString("en-IN", {
    month: "short",
  });
  const readingTime = readTime(JSON.parse(story.story).blocks);
  const addStoryToBookmark = async (id) => {
    if (!currentUser)
      return router.push({
        pathname: "/login",
        query: { from: router.asPath },
      });
    const isAlreadyBookmarked = story.bookmarkedBy.includes(currentUser.userId);

    if (isAlreadyBookmarked)
      return toast({
        description: "You have already bookmarked the story",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    try {
      await storiesService.bookmarkStory({ storyId: id });
      setBookMarkedPosts([...bookmarkedPosts, id]);
      toast({
        description: "Story bookmarked successfully",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error?.response?.data.message,
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };
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
                    : "https://picsum.photos/300/300.jpg"
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
                  color={colorMode === "dark" ? "gray.100" : "gray.700"}
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
                  color={colorMode === "dark" ? "gray.400" : "gray.600"}
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
                        <Text fontWeight="semibold" fontSize="x-small">
                          {story.author.name}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" fontSize="x-small">
                      {`${day} ${month}`}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="semibold" fontSize="x-small">
                      {readingTime.text}
                    </Text>
                  </Box>
                  <Box>
                    <Tooltip label="Bookmark Story">
                      <Box
                        w="5"
                        h="4"
                        color={
                          currentUser &&
                          (bookmarkedPosts.includes(story._id) ||
                            story.bookmarkedBy.includes(currentUser.userId))
                            ? "orange.400"
                            : "gray.600"
                        }
                        _hover={{ color: "orange.400" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("clicked", story._id);
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
