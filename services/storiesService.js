import apiService from "./apiService";

const endPoint = "/stories";
const bookmarkStoryEndPoint = "/bookmark-story";
const createStory = ({ story }) => apiService.post(endPoint, { story });

const updateStory = ({ story, storyId }) =>
  apiService.put(`${endPoint}/${storyId}`, { story });

const getStory = ({ storyId }) => apiService.get(`${endPoint}/${storyId}`);

const getAllStories = () => apiService.get(endPoint);

const publishStory = ({ storyId, published }) =>
  apiService.put(`${endPoint}/${storyId}`, { published });

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
