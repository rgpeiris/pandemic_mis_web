import { httpCovidNews } from "./httpClient";

export const getCovidNewsRequest = () => {
  return httpCovidNews.get(`pandemic-news`);
};

export const postCovidNewsRequest = (userData) => {
  return httpCovidNews.post(`pandemic-news`, userData);
};

export const getCovidNewsByIdRequest = (newsId) => {
  return httpCovidNews.get(`pandemic-news/${newsId}`);
};

export const putCovidNewsRequest = (userData) => {
  return httpCovidNews.put(`pandemic-news`, userData);
};
