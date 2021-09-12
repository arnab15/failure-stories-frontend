/* eslint-disable no-shadow */
/* eslint-disable import/no-named-as-default-member */
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import commentService from "../../services/commentService";
import Comment from "../Comment/Comment";

function CommentDrawer({ closeDrawer, isDrawerOpen, storyId }) {
  const textEditableRef = useRef();
  const [comments, setComments] = useState([]);
  const [loading, setloading] = useState(false);
  const toast = useToast();
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();
  const getStoryComments = async () => {
    try {
      setloading(true);
      const { data } = await commentService.getCommentsByStoryId(storyId);
      console.log("comments", data);
      setComments(data);
      setloading(false);
    } catch (error) {
      toast({
        title: "Unable get comments,please refresh",
        status: "error",
        duration: 3000,
        position: "top",
      });
      setloading(false);
      console.log("error occured on comment fetching");
    }
  };

  const handelcreateNewComment = async (text) => {
    console.log("create--", text);
    try {
      if (!currentUser) {
        router.push({
          pathname: "/login",
          query: { from: router.asPath },
        });
        return;
      }
      setCommentSubmitting(true);
      await commentService.createNewComment({
        comment: text,
        storyId,
      });
      await getStoryComments(storyId);

      setCommentSubmitting(false);
    } catch (error) {
      toast({
        title: "Unable create new comment,please try again",
        status: "error",
        duration: 3000,
        position: "top",
      });
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (textEditableRef.current) {
      console.log(textEditableRef.current.innerText);
    }
    getStoryComments(storyId);
  }, []);

  return (
    <Drawer
      isOpen={isDrawerOpen}
      placement="right"
      onClose={closeDrawer}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Comments ({comments.length})</DrawerHeader>

        <DrawerBody>
          <Skeleton isLoaded={!loading}>
            <Comment
              comments={comments}
              handelcreateNewComment={handelcreateNewComment}
              commentSubmitting={commentSubmitting}
              refreshComments={getStoryComments}
            />
          </Skeleton>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default CommentDrawer;
