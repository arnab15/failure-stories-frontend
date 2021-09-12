/* eslint-disable no-underscore-dangle */
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import userService from "../../../services/userService";
import withProtectedRoute from "../../../hoc/withProtectedRoute";
import StoryHorizontalCard from "../../../Components/StoryHorizontalCard/StoryHorizontalCard";
import storiesService from "../../../services/storiesService";

function Story(props) {
  const [currentPage, setCurrentPage] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { name } = router.query;

  const getUserStories = async (published) => {
    try {
      setLoading(true);
      const { data } = await userService.getUserStories({
        published,
      });
      setStories(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handelStoryDelete = async (storyId) => {
    try {
      const filteredStories = stories.filter((story) => story._id !== storyId);
      await storiesService.deleteStory({
        storyId,
      });
      setStories(filteredStories);
    } catch (error) {
      console.log("error deleting story");
    }
  };

  useEffect(() => {
    switch (name) {
      case "unpublished":
        setCurrentPage("unpublished");
        setTabIndex(0);
        getUserStories(false);
        break;
      case "published":
        setCurrentPage("published");
        setTabIndex(1);
        getUserStories(true);
        break;
      case "replies":
        setCurrentPage("replies");
        setTabIndex(2);
        break;
      default:
        setCurrentPage("notFound");
        break;
    }
  }, [name]);

  if (currentPage === "notFound") return <Box>No Result found</Box>;
  return (
    <Box px={["", "10"]} overflow="hidden">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        py="2"
        px={["2.5", "0", "0"]}
      >
        <Text fontSize="3xl" fontWeight="semibold" alignItems="center">
          Your Stories
        </Text>
        <Flex justifyContent="flex-end">
          <Link href="/story/new-story">
            <Box
              p="2"
              border="1px"
              borderColor="green.400"
              borderRadius="3xl"
              cursor="pointer"
            >
              <Text fontSize="smaller" textColor="green.400">
                Write a story
              </Text>
            </Box>
          </Link>
        </Flex>
      </Flex>
      <Skeleton isLoaded={!loading}>
        <Tabs index={tabIndex}>
          <TabList>
            <Tab _focus={{ boxShadow: "none" }}>
              <Link
                href={{
                  pathname: "/profile/stories/[name]",
                  query: { name: "unpublished" },
                }}
              >
                Unpublished
              </Link>
            </Tab>
            <Tab _focus={{ boxShadow: "none" }}>
              <Link
                href={{
                  pathname: "/profile/stories/[name]",
                  query: { name: "published" },
                }}
              >
                Published
              </Link>
            </Tab>
            <Tab _focus={{ boxShadow: "none" }}>
              <Link
                href={{
                  pathname: "/profile/stories/[name]",
                  query: { name: "replies" },
                }}
              >
                Replies
              </Link>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* {JSON.stringify(name)}
            {JSON.stringify(stories)} */}
              <Box>
                {stories.map((story) => (
                  <StoryHorizontalCard
                    story={story}
                    handelStoryDelete={handelStoryDelete}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              {/*             
            {JSON.stringify(name)}
            {JSON.stringify(stories)} */}
              <Box>
                {stories.map((story) => (
                  <StoryHorizontalCard
                    story={story}
                    handelStoryDelete={handelStoryDelete}
                  />
                ))}
              </Box>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
              {JSON.stringify(name)}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Skeleton>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(Story)), {
  ssr: false,
});
