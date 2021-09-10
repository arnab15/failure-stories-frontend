/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";

import React, { useState } from "react";
import CommentDrawer from "../../../Components/CommentDrawer/CommentDrawer";
import Parser from "../../../Components/Parser";
import Title from "../../../Components/Parser/Title";
import ProfileCard from "../../../Components/ProfileCard/ProfileCard";
import { readTime } from "../../../utils/calculateReadTime";

function Story({ story }) {
  const value = useBreakpointValue({ base: "100%", md: "600px" });
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const parsedBlocks = JSON.parse(story.story).blocks;
  console.log("vall", value);
  console.log("time", readTime());
  console.log("story-----", parsedBlocks);
  const openDrawer = () => {
    setisDrawerOpen(true);
  };
  const closeDrawer = () => {
    setisDrawerOpen(false);
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
          {parsedBlocks.length > 1 &&
            parsedBlocks
              .slice(1)
              .map((block) => <Parser block={block} key={block.id} />)}

          {/* <Box>
            <Text fontSize="20px">
              &#8220;Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Atque, quas. &#8221; - Dalihi Lamha
            </Text>
          </Box> */}
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
