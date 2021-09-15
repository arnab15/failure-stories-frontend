/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {
  Box,
  Button,
  Flex,
  Text,
  Divider,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import withProtectedRoute from "../../../hoc/withProtectedRoute";
import storiesService from "../../../services/storiesService";
import Select from "../../../Components/ReactSelectChakraUI/ReactSelectChakraUi";

const Editor = dynamic(
  // eslint-disable-next-line import/no-extraneous-dependencies
  () => import("../../../Components/RichTextEditor/Editor"),
  { ssr: false }
);

const colourOptions = [
  { value: "Career Failure", label: "Career Failure" },
  { value: "Failed in College", label: "Failed in College" },
  { value: "Failed in Life", label: "Failed in Life" },
  { value: "Relationship Failed", label: "Relationship Failed" },
];

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
        <Text>Create Story</Text>
      </Flex>
      <Box
        rounded="md"
        mx="auto"
        shadow="inner"
        p="2"
        w={["100%", "100%", "52%"]}
      >
        <Text
          as="h2"
          pl={["", "", "55px"]}
          fontSize="25px"
          fontWeight="500"
          pt="4"
        >
          Share your story with us :
        </Text>
        <Divider w="50%" mx="auto" mt="3" color="gray.700" />
        <Box>
          {storyData && (
            <Editor
              initialData={JSON.parse(storyData.story)}
              isNew={false}
              getData={handelDataSubmit}
              autofocus="true"
            />
          )}
        </Box>
        <Box>
          <Text
            as="h2"
            pl={["0", "0", "55px"]}
            py="2"
            fontSize="25px"
            fontWeight="500"
          >
            Lesson Learnt :
          </Text>
          <Divider w="50%" mx="auto" my="4" />
          <Box>{storyData && <Editor isNew={false} autofocus="false" />}</Box>
        </Box>
        <Box>
          <FormControl p={4}>
            <Select
              isMulti
              name="colors"
              options={colourOptions}
              placeholder="Add some tags..."
              closeMenuOnSelect
              size="sm"
              onChange={(value) => console.log("val", value)}
            />
          </FormControl>
        </Box>
        <Flex justifyContent="space-between" alignItems="center" px="4" mb="16">
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="email-alerts" mb="0">
              Post anonymously!
            </FormLabel>
            <Switch id="email-alerts" />
          </FormControl>
          {storyData && !storyData.published && (
            <Button
              borderRadius="2xl"
              onClick={handelStoryPublish}
              colorScheme="orange"
            >
              Publish
            </Button>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(EditStory)), {
  ssr: false,
});
