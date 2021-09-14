import React, { useEffect, useState } from "react";
import { Box, useToast, Text, Stack, Skeleton } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import { getBookmarkedStories } from "../../services/profileService";
import ArticalCard from "../../Components/ArticalCard/ArticalCard";

function BookmarkedStories(props) {
  const toast = useToast();
  const [stories, setStories] = useState([]);
  const [loading, setloading] = useState(false);
  const getBookmarkStoriesOfUser = async () => {
    try {
      setloading(true);
      const { data } = await getBookmarkedStories();
      setStories(data);
      setloading(false);
    } catch (error) {
      setloading(false);
      toast({
        description: error?.response?.data.message,
        status: "error",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getBookmarkStoriesOfUser();
  }, []);
  return (
    <Box>
      <Box
        mx="2"
        pr={["0", "0", "50px"]}
        borderRight={["none", "none", "1px solid #EEEEEE"]}
        mt="4"
      >
        <Text fontSize="18px" fontWeight="500" pt="4" pb="2" textAlign="center">
          Your bookmarked Stories
        </Text>
        {!loading && stories.length === 0 && (
          <Text
            fontSize="large"
            color="pink.400"
            fontWeight="bold"
            pb="2"
            textAlign="center"
          >
            You havn't bookmarked any story yet
          </Text>
        )}
        <Stack
          spacing="6"
          justifyContent="start"
          alignItems="center"
          alignContent="flex-start"
        >
          {stories.map((story) => (
            <Skeleton isLoaded={!loading}>
              <ArticalCard
                key={story._id}
                story={story}
                showBookmarkOption={false}
              />
            </Skeleton>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default dynamic(
  () => Promise.resolve(withProtectedRoute(BookmarkedStories)),
  {
    ssr: false,
  }
);
