import apiService from "./apiService";

const endPoint = "/authorStories";

const getUserStories = ({ published = false }) =>
  apiService.get(`${endPoint}/?published=${published}`);

export default {
  getUserStories,
};
