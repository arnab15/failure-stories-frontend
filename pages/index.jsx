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
} from "@chakra-ui/react";
import React from "react";
import Link from "next/dist/client/link";
import ArticalCard from "../Components/ArticalCard/ArticalCard";

export default function Home({ data }) {
  console.log("data", data);
  return (
    <Box mx={["0", "0", "8%"]}>
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
              <ArticalCard key={story._id} story={story} />
            ))}
          </Stack>
        </Box>
        <Box display={["none", "none", "block"]} px="6" mt="4">
          <Box>
            <Text fontSize="16px" fontWeight="500" pt="4" pb="0.5" ml="2">
              Are you excited to share your failed story?
            </Text>
            <Text as="p" fontWeight="400" pb="2" ml="2">
              You can share your failure story or rejection story with us with
              out any hesitation
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
                Write Now
              </Button>
            </Link>
          </Box>

          <Box>
            <Text fontSize="18px" fontWeight="500" pt="4" pb="2" ml="2">
              Available Topics
            </Text>
            <Flex flexWrap="wrap">
              <Badge
                colorScheme="gray"
                mx="2"
                my="2"
                p="1.5"
                borderRadius="full"
                color="gray.600"
                textTransform="capitalize"
                fontWeight="500"
                cursor="pointer"
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                <Text px="1.5"> Relationship Faliled</Text>
              </Badge>
              <Badge
                colorScheme="gray"
                mx="2"
                my="2"
                p="1.5"
                borderRadius="full"
                color="gray.600"
                textTransform="capitalize"
                fontWeight="500"
                cursor="pointer"
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                <Text px="1.5"> Interview failed</Text>
              </Badge>
              <Badge
                colorScheme="gray"
                mx="2"
                my="2"
                p="1.5"
                borderRadius="full"
                color="gray.600"
                textTransform="capitalize"
                fontWeight="500"
                cursor="pointer"
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                <Text px="1.5">Family failed</Text>
              </Badge>
              <Badge
                colorScheme="gray"
                mx="2"
                my="2"
                p="1.5"
                borderRadius="full"
                color="gray.600"
                textTransform="capitalize"
                fontWeight="500"
                cursor="pointer"
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                <Text px="1.5">Job failed</Text>
              </Badge>
              <Badge
                colorScheme="gray"
                mx="2"
                my="2"
                p="1.5"
                borderRadius="full"
                color="gray.600"
                textTransform="capitalize"
                fontWeight="500"
                cursor="pointer"
                _hover={{
                  backgroundColor: "gray.200",
                }}
              >
                <Text px="1.5">Exam failed</Text>
              </Badge>
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
