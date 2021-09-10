/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import withProtectedRoute from "../../../hoc/withProtectedRoute";
import storiesService from "../../../services/storiesService";

const Editor = dynamic(
  // eslint-disable-next-line import/no-extraneous-dependencies
  () => import("../../../Components/RichTextEditor/Editor"),
  { ssr: false }
);
function EditStory(props) {
  const router = useRouter();
  const [storyData, setStoryData] = useState();
  const handelDataSubmit = async (data) => {
    console.log("dss", data);
    try {
      const { story_id } = router.query;
      await storiesService.updateStory({
        storyId: story_id,
        story: data,
      });
    } catch (error) {
      console.log("error occured during auto save");
    }
  };
  const handelStoryPublish = async () => {
    try {
      await storiesService.publishStory({
        storyId: storyData._id,
        published: true,
      });
      setStoryData({
        ...storyData,
        published: true,
      });
    } catch (error) {
      console.log("Error Publishing data");
    }
  };
  const getStoryById = async (storyId) => {
    try {
      const { data } = await storiesService.getStory({
        storyId,
      });
      setStoryData(data);
      console.log("dataaa", JSON.parse(data.story));
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { story_id } = router.query;
      console.log("storyId", story_id);
      if (story_id) {
        getStoryById(story_id);
      }
    }
  }, [router]);

  return (
    <Box h="full">
      <Flex justify="space-between" py="3" px="2">
        <Text>Write Story</Text>
        {storyData && !storyData.published && (
          <Button borderRadius="2xl" onClick={handelStoryPublish}>
            Publish
          </Button>
        )}
      </Flex>
      <Box rounded="md" h="full" mx="auto" shadow="sm" p="2">
        {storyData && (
          <Editor
            initialData={JSON.parse(storyData.story)}
            isNew={false}
            getData={handelDataSubmit}
          />
        )}
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(EditStory)), {
  ssr: false,
});
