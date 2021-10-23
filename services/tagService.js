import apiService from "./apiService";

export const getAllTags = () => apiService.get("/tags");
