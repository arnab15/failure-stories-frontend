import { Avatar, Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { readTime } from "../../utils/calculateReadTime";

dayjs.extend(relativeTime);

function ProfileCard({ story, openDrawer }) {
  // const day = new Date(story.updatedAt).getDate();
  // const month = new Date(story.updatedAt).toLocaleString("en-IN", {
  //   month: "short",
  // });
  const readingTime = readTime(JSON.parse(story.story).blocks);

  return (
    <Flex justifyContent="space-between" py="2" mt="2">
      <Flex alignItems="center">
        <Box>
          <Avatar
            src={
              story.postAnonomusly || !story.author.profilePic
                ? `https://avatars.dicebear.com/api/avataaars/${story.author.name}.svg`
                : story.author.profilePic
            }
          />
        </Box>
        <Flex direction="column" pl="2">
          <Text fontWeight="500" fontSize="15px">
            {story.postAnonomusly ? "Unknown" : story.author.name.split(" ")[0]}
          </Text>
          <Flex
            fontSize="13px"
            fontWeight="500"
            color="gray.500"
            justify="space-between"
          >
            {/* <Text pr="1">{`${day} ${month}`}</Text> */}
            <Text pr="1">{dayjs(dayjs(story.updatedAt)).fromNow()}</Text>
            <Text px="1">{readingTime.text}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Tooltip label="Comments">
          <Text
            h={["8", "10"]}
            w={["8", "10"]}
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
        {/* <Text
          h={["6", "8"]}
          w={["6", "8"]}
          color="gray"
          px="1"
          cursor="pointer"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </Text> */}
      </Flex>
    </Flex>
  );
}

export default ProfileCard;
