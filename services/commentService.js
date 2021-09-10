/* eslint-disable import/prefer-default-export */
import apiService from "./apiService";

const commentEndpoint = "/comments";
const replyEndpoint = "/comments/reply";

export const getCommentsByStoryId = (storyId) =>
  apiService.get(commentEndpoint, { params: { storyId } });

export const createNewComment = ({ comment, storyId }) =>
  apiService.post(commentEndpoint, { comment, storyId });
export const createNewReply = ({ reply, commentId }) =>
  apiService.post(replyEndpoint, { reply, commentId });

export default {
  getCommentsByStoryId,
  createNewComment,
  createNewReply,
};
