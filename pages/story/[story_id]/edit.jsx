/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import { Box, Button, Flex, Text, Divider } from "@chakra-ui/react";
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
      <Box
        rounded="md"
        h="full"
        mx="auto"
        shadow="inner"
        p="2"
        w={["100%", "100%", "52%"]}
      >
        <Text as="h2" pl={["", "", "55px"]} fontSize="25px" fontWeight="500">
          Share your story with us
        </Text>
        <Divider w="50%" mx="auto" mt="3" color="gray.700" />
        <Box>
          {storyData && (
            <Editor
              initialData={JSON.parse(storyData.story)}
              isNew={false}
              getData={handelDataSubmit}
            />
          )}
        </Box>
      </Box>
      <Box my="6">
        <Box
          rounded="md"
          h="full"
          mx="auto"
          shadow="inner"
          p="2"
          w={["100%", "100%", "52%"]}
        >
          <Text
            as="h2"
            pl={["0", "0", "55px"]}
            py="2"
            fontSize="25px"
            fontWeight="500"
          >
            Why did you think you had failed/Rejected ?
          </Text>
          <Divider w="50%" mx="auto" my="4" />
          <Box>{storyData && <Editor isNew={false} />}</Box>
        </Box>
      </Box>
      <Box my="6">
        <Box
          rounded="md"
          h="full"
          mx="auto"
          shadow="inner"
          p="2"
          w={["100%", "100%", "52%"]}
        >
          <Text
            as="h2"
            pl={["0", "0", "55px"]}
            py="2"
            fontSize="25px"
            fontWeight="500"
          >
            What are the best parts that you have learnt from it?
          </Text>
          <Divider w="50%" mx="auto" my="4" />
          <Box>{storyData && <Editor isNew={false} />}</Box>
        </Box>
      </Box>
      <Box my="6">
        <Box
          rounded="md"
          h="full"
          mx="auto"
          shadow="inner"
          p="2"
          w={["100%", "100%", "52%"]}
        >
          <Text
            as="h2"
            pl={["0", "0", "55px"]}
            py="2"
            fontSize="25px"
            fontWeight="500"
          >
            What are the advice you would like to give who are doing same
            mistakes?
          </Text>
          <Divider w="50%" mx="auto" my="4" />
          <Box>{storyData && <Editor isNew={false} />}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(EditStory)), {
  ssr: false,
});
