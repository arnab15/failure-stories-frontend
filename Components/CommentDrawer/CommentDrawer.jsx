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
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import commentService from "../../services/commentService";
import Comment from "../Comment/Comment";

const comment = [
  {
    _id: "1",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat voluptates laborum non nobis facere?",
    replies: [
      {
        _id: "1",
        reply:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias repudiandae corporis natus in accusamus minima.",
        repliedBy: {
          _id: "1",
          name: "Friends",
        },
      },
      {
        _id: "2",
        reply:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias repudiandae corporis natus in accusamus minima.",
        repliedBy: {
          _id: "1",
          name: "hit",
        },
      },
    ],
    commentedBy: {
      _id: "1",
      name: "Arnab",
    },
  },
  {
    _id: "2",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat voluptates laborum non nobis facere?",
    replies: [
      {
        _id: "1",
        reply:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias repudiandae corporis natus in accusamus minima.",
      },
      {
        _id: "2",
        reply:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias repudiandae corporis natus in accusamus minima.",
      },
    ],
    commentedBy: {
      _id: "1",
      name: "Arnab",
    },
  },
  {
    _id: "3",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quaerat voluptates laborum non nobis facere?",
    replies: [],
    commentedBy: {
      _id: "1",
      name: "Arnab",
    },
  },
];

function CommentDrawer({ closeDrawer, isDrawerOpen, storyId }) {
  const textEditableRef = useRef();
  const [comments, setComments] = useState([]);
  const toast = useToast();
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const { currentUser } = useAuth();
  const router = useRouter();
  const getStoryComments = async () => {
    try {
      const { data } = await commentService.getCommentsByStoryId(storyId);
      console.log("comments", data);
      setComments(data);
    } catch (error) {
      toast({
        title: "Unable get comments,please refresh",
        status: "error",
        duration: 3000,
        position: "top",
      });
      console.log("error occured on comment fetching");
    }
  };

  const handelcreateNewComment = async (text) => {
    console.log("create--", text);
    try {
      if (!currentUser) {
        router.push("/login");
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
          <Comment
            comments={comments}
            handelcreateNewComment={handelcreateNewComment}
            commentSubmitting={commentSubmitting}
            refreshComments={getStoryComments}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default CommentDrawer;
