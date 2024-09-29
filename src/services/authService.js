import { httpAuth } from "./httpClient";

export const loginRequest = (userData) => {
  return httpAuth.post(`login`, userData);
};

export const getUsersRequest = () => {
  return httpAuth.get(`system-users`);
};

export const userRegisterRequest = (userData) => {
  return httpAuth.post(`register`, userData);
};

export const getUserByIdRequest = (username) => {
  return httpAuth.get(`system-user/${username}`);
};

export const updateUserRequest = (userId, userData) => {
  return httpAuth.put(`system-user/${userId}`, userData);
};
