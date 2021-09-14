/* eslint-disable consistent-return */
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContextProvider";
import storiesService from "../../services/storiesService";

export const useBookmarkStory = (story) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const toast = useToast();
  const [bookmarkedPosts, setBookMarkedPosts] = useState([]);

  const bookmarkAStory = async (storyIdToBookmark) => {
    if (!currentUser)
      return router.push({
        pathname: "/login",
        query: { from: router.asPath },
      });
    const isAlreadyBookmarked = story.bookmarkedBy.includes(currentUser.userId);
    const storyBookmarkedLocaly = bookmarkedPosts.includes(storyIdToBookmark);

    if (isAlreadyBookmarked || storyBookmarkedLocaly)
      return toast({
        description: "You have already bookmarked the story",
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    try {
      await storiesService.bookmarkStory({ storyId: storyIdToBookmark });
      setBookMarkedPosts([...bookmarkedPosts, storyIdToBookmark]);
      toast({
        description: "Story bookmarked successfully",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    } catch (error) {
      toast({
        description: error?.response?.data.message,
        status: "warning",
        duration: 4000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return {
    bookmarkAStory,
    currentUser,
    bookmarkedPosts,
  };
};
