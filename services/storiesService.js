import apiService from "./apiService";

const endPoint = "/stories";
const bookmarkStoryEndPoint = "/bookmark-story";
const createStory = ({ story, learning }) =>
  apiService.post(endPoint, { story, learning });

const updateStory = ({ story, storyId, learning }) =>
  apiService.put(`${endPoint}/${storyId}`, { story, learning });

const getStory = ({ storyId }) => apiService.get(`${endPoint}/${storyId}`);

const getAllStories = () => apiService.get(endPoint);

const publishStory = ({ storyId, published, tags, postAnonomusly }) =>
  apiService.put(`${endPoint}/${storyId}`, { published, tags, postAnonomusly });

const deleteStory = ({ storyId }) =>
  apiService.delete(`${endPoint}/${storyId}`);

const bookmarkStory = ({ storyId }) =>
  apiService.post(bookmarkStoryEndPoint, { storyId });

export default {
  createStory,
  getStory,
  updateStory,
  publishStory,
  getAllStories,
  deleteStory,
  bookmarkStory,
};
