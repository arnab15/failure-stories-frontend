/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { Box, Flex, Badge, Text, Tooltip } from "@chakra-ui/react";

import React, { useState } from "react";
import CommentDrawer from "../../../Components/CommentDrawer/CommentDrawer";
import Parser from "../../../Components/Parser";
import Title from "../../../Components/Parser/Title";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import { useBookmarkStory } from "../../../hooks/stories/useBookmarkStory";

function Story({ story }) {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { bookmarkAStory, currentUser, bookmarkedPosts } =
    useBookmarkStory(story);
  const parsedBlocks = JSON.parse(story.story).blocks;
  console.log("parsed block", parsedBlocks);
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
          <Title blocks={parsedBlocks} />
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

          <Flex justifyContent="space-between">
            <Flex flexWrap="wrap">
              {story.tags?.map((tag) => (
                <Badge
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
          destination: "/",
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
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Story;
