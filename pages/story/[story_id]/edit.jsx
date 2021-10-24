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
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import async from "react-select/async";
import withProtectedRoute from "../../../hoc/withProtectedRoute";
import storiesService from "../../../services/storiesService";
import Select from "../../../Components/ReactSelectChakraUI/ReactSelectChakraUi";
import { getAllTags } from "../../../services/tagService";

const Editor = dynamic(
  // eslint-disable-next-line import/no-extraneous-dependencies
  () => import("../../../Components/RichTextEditor/Editor"),
  { ssr: false }
);

const colourOptions = [
  { value: "😫 Career Failure", label: "😫 Career Failure" },
  { value: "Failed in College", label: "Failed in College" },
  { value: "Failed in Life", label: "Failed in Life" },
  { value: "Relationship Failed", label: "Relationship Failed" },
];
const storyFormValidationSchema = Yup.object().shape({
  tags: Yup.array()
    .min(1, "you have to select atleast one tag")
    .max(2, "You can choose maximum two tags")
    .required("You can't leave this blank."),
  postAnonomusly: Yup.boolean().required().default(false),
});
function EditStory(props) {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [storyData, setStoryData] = useState();
  const [currentStoryData, setCurrentStorydata] = useState({
    story: null,
    learning: null,
  });

  const fetchAllTagsAndSave = async () => {
    try {
      const { data } = await getAllTags();
      setTags(
        data.map((tag) => ({
          value: tag._id,
          label: `${tag.emoji} ${tag.title}`,
        }))
      );
    } catch (error) {
      console.log("tag fetch error");
    }
  };

  const handelSubmit = async (values) => {
    const tagArrayWithOnlyIds = values.tags.map((tag) => tag.value);
    try {
      await storiesService.publishStory({
        storyId: storyData._id,
        published: true,
        tags: tagArrayWithOnlyIds,
        postAnonomusly: values.postAnonomusly,
      });
      setStoryData({
        ...storyData,
        published: true,
      });
    } catch (error) {
      console.log("Error Publishing data");
    }
  };

  const storyForm = useFormik({
    initialValues: {
      tags: [],
      postAnonomusly: false,
    },
    onSubmit: handelSubmit,
    validationSchema: storyFormValidationSchema,
  });

  const handelDataSubmit = async (data) => {
    try {
      const { story_id } = router.query;
      setCurrentStorydata({
        story: data,
        learning: currentStoryData.learning
          ? { ...currentStoryData.learning }
          : null,
      });
      await storiesService.updateStory({
        storyId: story_id,
        story: data,
        learning: currentStoryData.learning
          ? { ...currentStoryData.learning }
          : null,
      });
    } catch (error) {
      console.log("error occured during auto save");
    }
  };

  const handelLessonLearntDataSubmit = async (learningData) => {
    setCurrentStorydata({
      story: currentStoryData.story ? { ...currentStoryData.story } : null,
      learning: learningData,
    });

    try {
      const { story_id } = router.query;

      await storiesService.updateStory({
        storyId: story_id,
        story: currentStoryData.story ? { ...currentStoryData.story } : null,
        learning: learningData,
      });
    } catch (error) {
      console.log("error occured during auto save learning");
    }
  };

  const getStoryById = async (storyId) => {
    try {
      const { data } = await storiesService.getStory({
        storyId,
      });
      setStoryData(data);
      setCurrentStorydata({
        story: JSON.parse(data.story),
        learning: data.learning ? JSON.parse(data.learning) : null,
      });
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { story_id } = router.query;
      if (story_id) {
        getStoryById(story_id);
      }
    }
  }, [router]);

  useEffect(() => {
    fetchAllTagsAndSave();
  }, []);

  useEffect(() => {
    if (storyData && storyData.tags) {
      const activeTags = storyData.tags.map((tag) => ({
        value: tag._id,
        label: `${tag.emoji} ${tag.title}`,
      }));
      storyForm.setFieldValue("tags", activeTags);
      storyForm.setFieldValue(
        "postAnonomusly",
        storyData.postAnonomusly && storyData.postAnonomusly === true
          ? "true"
          : "false"
      );
    }
  }, [storyData]);

  return (
    <Box h="full">
      <Flex justify="space-between" py="3" px="2">
        <Text>Create Story</Text>
      </Flex>
      <Box rounded="md" mx="auto" p="2" w={["100%", "100%", "52%"]}>
        <Text
          as="h2"
          pl={["", "", "5px"]}
          mb="1.5"
          fontSize="25px"
          fontWeight="500"
          pt="4"
        >
          Write your Failure/Rejection story 👇
        </Text>
        {/* <Divider w="50%" mx="auto" mt="3" color="gray.700" /> */}
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
            pl={["", "", "5px"]}
            mb="1.5"
            py="2"
            fontSize="25px"
            fontWeight="500"
          >
            Share your lessons that changed your Life 👇
          </Text>
          {/* <Divider w="50%" mx="auto" my="4" /> */}
          <Box>
            {storyData && (
              <Editor
                isNew={false}
                autofocus="false"
                getData={handelLessonLearntDataSubmit}
                initialData={currentStoryData.learning}
              />
            )}
          </Box>
        </Box>
        <form onSubmit={storyForm.handleSubmit}>
          <Box>
            <FormControl p={4} id="tags">
              <Select
                isMulti
                name="tags"
                options={tags}
                placeholder="Add some tags..."
                closeMenuOnSelect
                size="sm"
                onChange={(values) => {
                  storyForm.setFieldValue("tags", values, true);
                }}
                onBlur={storyForm.handleBlur}
                // defaultValue={storyData.tags}
                value={storyForm.values.tags}
              />
              {(storyForm.errors.tags || storyForm.touched.tags) && (
                <Text color="red.400">{storyForm.errors.tags}</Text>
                // <FormErrorMessage>
                //   {storyForm.errors.tags}
                // </FormErrorMessage>
              )}
            </FormControl>
          </Box>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            px="4"
            mb="16"
          >
            <FormControl display="flex" id="postAnonomusly" alignItems="center">
              {/* <FormLabel htmlFor="postAnonomusly" mb="0">
                Post Invisiblely!
              </FormLabel>
              <Switch
                name="postAnonomusly"
                id="postAnonomusly"
                onChange={storyForm.handleChange}
                onBlur={storyForm.handleBlur}
                value={storyForm.values.postAnonomusly}
              /> */}
              <Checkbox
                name="postAnonomusly"
                value={storyForm.values.postAnonomusly}
                onChange={storyForm.handleChange}
                onBlur={storyForm.handleBlur}
              >
                Post Invisiblely!
              </Checkbox>
              {(storyForm.errors.postAnonomusly ||
                storyForm.touched.postAnonomusly) && (
                <FormErrorMessage>
                  {storyForm.errors.postAnonomusly}
                </FormErrorMessage>
              )}
            </FormControl>
            {/* {storyData && !storyData.published && ( */}
            <Button
              borderRadius="2xl"
              // onClick={handelStoryPublish}
              colorScheme="orange"
              type="submit"
              disabled={storyForm.isSubmitting}
            >
              Publish
            </Button>
            {/* // )} */}
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(EditStory)), {
  ssr: false,
});
