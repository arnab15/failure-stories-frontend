import {
  Box,
  Flex,
  Avatar,
  Text,
  Divider,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/dist/client/router";
import ContentEditableInput from "../ContentEditableInput/ContentEditableInput";
import { createNewReply } from "../../services/commentService";
import { useAuth } from "../../context/AuthContextProvider";

dayjs.extend(relativeTime);

function Comment({
  comments,
  handelcreateNewComment,
  commentSubmitting = false,
  refreshComments,
}) {
  const [showReply, setShowReply] = useState(false);
  const [currentActiveComment, setCurrentActiveComment] = useState();
  const [replySubmitting, setReplySubmittiong] = useState(false);
  const toast = useToast();
  const { currentUser } = useAuth();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const handelCreateReply = async (text) => {
    console.log("reply", text);
    try {
      if (!currentUser) {
        router.push({
          pathname: "/login",
          query: { from: router.asPath },
        });
        return;
      }

      setReplySubmittiong(true);
      await createNewReply({
        commentId: currentActiveComment,
        reply: text,
      });
      await refreshComments();
      setShowReply(false);
      setCurrentActiveComment(null);
      setReplySubmittiong(false);
    } catch (error) {
      toast({
        title: "Unable create new Reply,please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setShowReply(false);
      setCurrentActiveComment(null);
      setReplySubmittiong(false);
      console.log("error occured during submission reply");
    }
  };

  return (
    <Box>
      <Box marginBottom="20px">
        <ContentEditableInput
          onSubmit={handelcreateNewComment}
          submiting={commentSubmitting}
        />
      </Box>
      <Divider mb="4" />
      {comments.map((comment) => (
        <Box mb="3" key={comment._id}>
          <Flex alignItems="center">
            <Box>
              <Avatar h="8" w="8" src="https://i.pravatar.cc/300" />
            </Box>
            <Flex direction="column" pl="2">
              <Text fontWeight="500" fontSize="13px">
                {comment.commentedBy?.name}
              </Text>
              <Flex
                fontSize="11px"
                fontWeight="400"
                color={colorMode === "light" ? "gray.500" : "gray.400"}
                justify="space-between"
              >
                <Text pr="1">{dayjs(dayjs(comment.createdAt)).fromNow()}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Box py="2" pl="1">
            <Text
              fontSize="14px"
              fontWeight="400"
              color={colorMode === "light" ? "gray.600" : "gray.100"}
            >
              {comment.comment}
            </Text>
            <Flex justifyContent="space-between" mr="2" my="3">
              <Flex>
                <Box w="6" h="6" color="orange.400" cursor="pointer">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Box>
                <Box ml="1.5">
                  <span>50</span>
                </Box>
              </Flex>
              <Box cursor="pointer">
                <Text
                  onClick={() => {
                    setCurrentActiveComment(comment._id);
                    setShowReply(!showReply);
                  }}
                >
                  Reply
                </Text>
              </Box>
            </Flex>
            <Box mt="4" pl="3" ml="3" borderLeft="3px solid gray">
              {showReply && currentActiveComment === comment._id && (
                <ContentEditableInput
                  onSubmit={handelCreateReply}
                  submiting={replySubmitting}
                />
              )}
              {comment?.replies.map((reply) => (
                <>
                  <Box mt="4" key={reply._id}>
                    <Flex alignItems="center">
                      <Box>
                        <Avatar h="8" w="8" src="https://i.pravatar.cc/300" />
                      </Box>
                      <Flex direction="column" pl="2">
                        <Text fontWeight="500" fontSize="13px">
                          {reply.repliedBy.name}
                        </Text>
                        <Flex
                          fontSize="11px"
                          fontWeight="400"
                          color={
                            colorMode === "light" ? "gray.500" : "gray.400"
                          }
                          justify="space-between"
                        >
                          <Text pr="1">
                            {dayjs(dayjs(reply.createdAt)).fromNow()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Text
                      mt="2"
                      fontSize="14px"
                      fontWeight="400"
                      color={colorMode === "light" ? "gray.600" : "gray.100"}
                    >
                      {reply.reply}
                    </Text>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      ))}

      {/* <Box>
        <Flex alignItems="center">
          <Box>
            <Avatar h="8" w="8" src="https://i.pravatar.cc/300" />
          </Box>
          <Flex direction="column" pl="2">
            <Text fontWeight="500" fontSize="13px">
              Arnab Sahoo
            </Text>
            <Flex
              fontSize="11px"
              fontWeight="400"
              color="gray.500"
              justify="space-between"
            >
              <Text pr="1">1 month ago</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box py="2" pl="1">
          <Text fontSize="14px" fontWeight="400" color="gray.600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
            earum voluptates eveniet pariatur esse cum doloribus perferendis
            molestiae adipisci et?
          </Text>
          <Flex justifyContent="space-between" mr="2" my="3">
            <Flex>
              <Box w="6" h="6" color="orange.400" cursor="pointer">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
              <Box ml="1.5">
                <span>50</span>
              </Box>
            </Flex>
            <Box cursor="pointer">
              <Text>Reply</Text>
            </Box>
          </Flex>
          <Box mt="4" pl="3" ml="3" borderLeft="3px solid gray">
            <Flex alignItems="center">
              <Box>
                <Avatar h="8" w="8" src="https://i.pravatar.cc/300" />
              </Box>
              <Flex direction="column" pl="2">
                <Text fontWeight="500" fontSize="13px">
                  Arnab Sahoo
                </Text>
                <Flex
                  fontSize="11px"
                  fontWeight="400"
                  color="gray.500"
                  justify="space-between"
                >
                  <Text pr="1">1 month ago</Text>
                </Flex>
              </Flex>
            </Flex>
            <Text mt="2" fontSize="14px" fontWeight="400" color="gray.600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Necessitatibus nulla odit expedita.
            </Text>
          </Box>
        </Box>
      </Box> */}
    </Box>
  );
}

export default Comment;
