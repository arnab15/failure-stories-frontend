/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import {
  Box,
  Text,
  Button,
  Divider,
  ModalFooter,
  Flex,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { getFirstDescription, getFirstHeader } from "../../utils/helpers";
import storiesService from "../../services/storiesService";

function StoryHorizontalCard({ story, handelStoryDelete }) {
  console.log("st", { story, isAvailable: story.story });
  const [modalVisible, setModalVisible] = useState(false);
  const parsedJsonBlocks = JSON.parse(story.story);
  console.log("parsed blocks", parsedJsonBlocks);
  const day = new Date(story.updatedAt).getDate();
  const month = new Date(story.updatedAt).toLocaleString("en-IN", {
    month: "short",
  });
  console.log({
    isNull: parsedJsonBlocks ? parsedJsonBlocks.blocks : null,
  });

  return (
    <Box cursor="pointer" height="20" py="2">
      <Link
        href={{
          pathname: `/story/[story_id]/edit`,
          query: { story_id: story._id },
        }}
      >
        <Box>
          <Text as="h3" fontWeight="medium" noOfLines={1}>
            {parsedJsonBlocks
              ? getFirstHeader(parsedJsonBlocks.blocks)
                ? getFirstHeader(parsedJsonBlocks.blocks)
                : "Untitled Story"
              : "Untitled Story"}
          </Text>
          <Text textColor="gray.500" fontSize="sm" as="p" noOfLines={1}>
            {parsedJsonBlocks && getFirstDescription(parsedJsonBlocks.blocks)}
          </Text>
        </Box>
      </Link>
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="xs" textColor="gray.400">
            Created {`${day} ${month}`}
          </Text>
          <Tooltip label="Delete story">
            <Box onClick={() => setModalVisible(true)}>
              <DeleteIcon color="red.400" cursor="pointer" />
            </Box>
          </Tooltip>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete Story</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to delete this story?</Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => setModalVisible(false)}
                >
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => {
                    handelStoryDelete(story._id);
                    setModalVisible(false);
                  }}
                >
                  Delete Story
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
      </Box>

      <Divider my="2" mb="6" colorScheme="messenger" />
    </Box>
  );
}

export default StoryHorizontalCard;
