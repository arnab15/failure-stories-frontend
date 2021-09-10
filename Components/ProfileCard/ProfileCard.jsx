import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { readTime } from "../../utils/calculateReadTime";

function ProfileCard({ story, openDrawer }) {
  console.log("story--pro", story);

  const day = new Date(story.updatedAt).getDate();
  const month = new Date(story.updatedAt).toLocaleString("en-IN", {
    month: "short",
  });

  const readingTime = readTime(JSON.parse(story.story).blocks);
  return (
    <Flex justifyContent="space-between" py="2">
      <Flex alignItems="center">
        <Box>
          <Avatar
            src={
              !story.author.imgUrl
                ? `https://avatars.dicebear.com/api/avataaars/${story.author.name}.svg?mood[]=happy`
                : story.author.imgUrl
            }
          />
        </Box>
        <Flex direction="column" pl="2">
          <Text fontWeight="500" fontSize="15px">
            {story.author.name}
          </Text>
          <Flex
            fontSize="13px"
            fontWeight="500"
            color="gray.500"
            justify="space-between"
          >
            <Text pr="1">{`${day} ${month}`}</Text>
            <Text px="1">{readingTime.text}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Tooltip label="save to read later">
          <Text
            h={["7", "10"]}
            w={["7", "10"]}
            color="gray.500"
            px="1"
            cursor="pointer"
            fontWeight="500"
          >
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
          </Text>
        </Tooltip>

        <Tooltip label="Share">
          <Text
            h={["7", "10"]}
            w={["7", "10"]}
            color="green.500"
            px="1"
            cursor="pointer"
          >
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
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
          </Text>
        </Tooltip>
        <Tooltip label="Comments">
          <Text
            h={["7", "10"]}
            w={["7", "10"]}
            color="blue.500"
            px="1"
            cursor="pointer"
            onClick={openDrawer}
          >
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
}

export default ProfileCard;
