import httpService from "./apiService";

const profileEndPoint = "/profile";
const updateNameEndPoint = "/profile/update-name";
const updateBioEndPoint = "/profile/update-bio";
const bookmarkedStories = "/profile/bookmarked-stories";
export const getUserProfileDetails = () => httpService.get(profileEndPoint);
export const updateBio = (bio) => httpService.post(updateBioEndPoint, { bio });
export const updateName = (name) =>
  httpService.post(updateNameEndPoint, { name });

export const getBookmarkedStories = () => httpService.get(bookmarkedStories);
