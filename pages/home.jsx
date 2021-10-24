/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
import {
  Box,
  Flex,
  Stack,
  Text,
  SimpleGrid,
  Badge,
  Divider,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/dist/client/link";
import Router from "next/router";
import ArticalCard from "../Components/ArticalCard/ArticalCard";
import { getAllTags } from "../services/tagService";

export default function Home({ data }) {
  const [loading, setLoading] = React.useState(false);
  const [tags, setTags] = useState([]);

  const fetchAllTagsAndSave = async () => {
    try {
      const { data: tagData } = await getAllTags();
      setTags(
        tagData.map((tag) => ({
          value: tag._id,
          label: `${tag.emoji} ${tag.title}`,
        }))
      );
    } catch (error) {
      console.log("tag fetch error");
    }
  };

  React.useEffect(() => {
    fetchAllTagsAndSave();
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <Box mx={["0", "0", "8%"]} mt="66px">
      <SimpleGrid
        // columns={["1", "1", "2"]}
        spacing={2}
        gridTemplateColumns={["100% 0%", "100% 0%", "65% 35%"]}
      >
        <Box
          mx="2"
          pr={["0", "0", "50px"]}
          borderRight={["none", "none", "1px solid #EEEEEE"]}
          mt="4"
        >
          <Text fontSize="18px" fontWeight="500" pt="4" pb="2">
            Recomanded Stories For You
          </Text>
          <Stack spacing="6">
            {data.map((story) => (
              <Skeleton isLoaded={!loading} key={story._id}>
                <ArticalCard key={story._id} story={story} />
              </Skeleton>
            ))}
          </Stack>
        </Box>
        <Box display={["none", "none", "block"]} px="6" mt="4">
          <Box>
            <Text fontSize="16px" fontWeight="500" pt="4" pb="0.5" ml="2">
              if society and people don't judge you
            </Text>
            <Text as="p" fontWeight="400" pb="2" ml="2">
              would you like to share your failure stories with us?
            </Text>
            <Link href="story/new-story">
              <Button
                my="4"
                mx="25%"
                borderRadius="full"
                _focus={{
                  boxShadow: "none",
                }}
              >
                Write Your Story Now 🐱‍🏍
              </Button>
            </Link>
          </Box>

          <Box>
            <Text fontSize="18px" fontWeight="500" pt="4" pb="2" ml="2">
              Available Tags
            </Text>
            <Flex flexWrap="wrap">
              {tags.map((tag) => (
                <Badge
                  key={tag.value}
                  colorScheme="gray"
                  mx="2"
                  my="2"
                  p="1.5"
                  borderRadius="full"
                  textTransform="capitalize"
                  fontWeight="500"
                  cursor="pointer"
                >
                  <Text px="1.5"> {tag.label}</Text>
                </Badge>
              ))}
            </Flex>
          </Box>
          <Divider w="70%" mx="auto" mt="4" />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${process.env.baseUrl}/stories`);
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
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
}
