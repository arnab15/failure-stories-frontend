/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { Box, Flex, Badge, Text, Tooltip, Divider } from "@chakra-ui/react";
import { useRouter } from "next/router";

import React, { useState } from "react";
import CommentDrawer from "../../../Components/CommentDrawer/CommentDrawer";
import Parser from "../../../Components/Parser";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import { useBookmarkStory } from "../../../hooks/stories/useBookmarkStory";

function Story({ story }) {
  const router = useRouter();
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { bookmarkAStory, currentUser, bookmarkedPosts } =
    useBookmarkStory(story);
  const parsedBlocks = JSON.parse(story.story).blocks;
  const parsedLearningBlocks =
    story.learning && JSON.parse(story.learning).blocks;

  const openDrawer = () => {
    setisDrawerOpen(true);
  };
  const closeDrawer = () => {
    setisDrawerOpen(false);
  };
  const handelBookmarkButtonClick = async () => {
    await bookmarkAStory(story._id);
  };
  return (
    <Box w="full" h="full" pb="6">
      <Box>
        <Flex justifyContent="center" direction="column" px={["5%", "20%"]}>
          <Flex alignItems="center" justifyContent="space-between">
            <Tooltip label="Go Back">
              <Box
                h="8"
                w="8"
                my="2"
                cursor="pointer"
                color="gray.400"
                onClick={() => router.back()}
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
            </Tooltip>
            <Flex alignItems="center" flex={1} ml="4">
              <Divider />
              <Text as="p" fontSize="md" fontWeight="semibold" ml="10" mr="10">
                Story
              </Text>
              <Divider />
            </Flex>
          </Flex>
          <ProfileCard story={story} openDrawer={openDrawer} />
          <CommentDrawer
            isDrawerOpen={isDrawerOpen}
            closeDrawer={closeDrawer}
            storyId={story._id}
          />
          {parsedBlocks.length > 0 &&
            parsedBlocks.map((block) => (
              <Parser block={block} key={block.id} />
            ))}
          {parsedLearningBlocks && parsedLearningBlocks.length > 0 && (
            <Box>
              <Flex alignItems="center">
                <Divider />
                <Text
                  as="p"
                  fontSize="md"
                  fontWeight="semibold"
                  ml="10"
                  mr="10"
                >
                  Learnings
                </Text>
                <Divider />
              </Flex>
              {parsedLearningBlocks.length > 0 &&
                parsedLearningBlocks.map((block) => (
                  <Parser block={block} key={block.id} />
                ))}
            </Box>
          )}

          <Flex justifyContent="space-between">
            <Flex flexWrap="wrap">
              {story.tags?.map((tag) => (
                <Badge
                  key={tag.title}
                  rounded="md"
                  colorScheme="messenger"
                  fontSize={["x-small", "small"]}
                  p="1.5"
                  mr="1.5"
                >
                  <Text p="0.5">{`${tag.emoji} ${tag.title}`}</Text>
                </Badge>
              ))}
            </Flex>

            <Tooltip label="Bookmark Story">
              <Text
                h={["6", "8"]}
                w={["6", "8"]}
                color={
                  currentUser &&
                  (bookmarkedPosts.includes(story._id) ||
                    story.bookmarkedBy.includes(currentUser.userId))
                    ? "orange.400"
                    : "gray.600"
                }
                px="1"
                cursor="pointer"
                fontWeight="500"
                onClick={handelBookmarkButtonClick}
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </Text>
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
export async function getServerSideProps(context) {
  const { params } = context;

  const { story_id } = params;
  try {
    const res = await fetch(`${process.env.baseUrl}/stories/${story_id}`);
    const data = await res.json();
    if (!data) {
      return {
        redirect: {
          destination: "/home",
          permanent: false,
        },
      };
    }
    return {
      props: {
        story: data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
}

export default Story;
