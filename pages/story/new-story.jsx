import { Box, Text, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useState } from "react";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import storiesService from "../../services/storiesService";

const Editor = dynamic(
  // eslint-disable-next-line import/no-extraneous-dependencies
  () => import("../../Components/RichTextEditor/Editor"),
  { ssr: false }
);
function NewStory() {
  const router = useRouter();
  const toast = useToast();
  const [storyData, setStoryData] = useState({
    story: null,
    learning: null,
  });

  // if (isNew) {
  //   console.log("editor data changed");
  //   try {
  //     const savedData = await instanceRef.current.save();

  //     const { data } = await storiesService.createStory({
  //       story: savedData,
  //     });
  //     console.log("daata", data);
  //     if (data._id) {
  //       router.push(`/story/${data._id}/edit`);
  //     }
  //     getData(data);
  //     console.log(data);
  //     return;
  //   } catch (error) {
  //     console.log("Error occured");
  //   }
  // } else {
  //   console.log("old data");
  //   try {
  //     const savedData = await instanceRef.current.save();
  //     getData(savedData);
  //     return;
  //   } catch (error) {
  //     console.log("Error old data saving");
  //   }
  // }

  const handelStoryDataSubmit = async (val) => {
    setStoryData({
      story: val,
      learning: storyData.learning ? { ...storyData.learning } : null,
    });

    try {
      const { data } = await storiesService.createStory({
        story: val,
        learning: storyData.learning ? { ...storyData.learning } : null,
      });
      console.log("returned data after create", data);
      if (data._id) {
        router.push(`/story/${data._id}/edit`, undefined, { shallow: true });
      }
    } catch (error) {
      toast({
        description: "Internal server error",
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handelLearningDataSubmit = async (value) => {
    setStoryData({
      story: storyData.story ? { ...storyData.story } : null,
      learning: value,
    });
    try {
      const { data } = await storiesService.createStory({
        story: storyData.story ? { ...storyData.story } : null,
        learning: value,
      });
      console.log("returned data after create", data);
      if (data._id) {
        router.push(`/story/${data._id}/edit`, undefined, { shallow: true });
      }
    } catch (error) {
      toast({
        description: "Internal server error",
        status: "error",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box h="full" rounded="md" mx="auto" p="2" w={["100%", "100%", "52%"]}>
      <Box rounded="md" h="full" mx="auto" shadow="sm" p="2">
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
        <Editor getData={handelStoryDataSubmit} />
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
          <Editor getData={handelLearningDataSubmit} autofocus="false" />
        </Box>
      </Box>
    </Box>
  );
}

export default dynamic(() => Promise.resolve(withProtectedRoute(NewStory)), {
  ssr: false,
});
