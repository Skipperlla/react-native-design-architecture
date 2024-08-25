import axios, { AxiosError, AxiosResponse } from "axios";

import { STORAGE_KEYS } from "@app/constants";
import { mmkvStorage } from "@app/store";
import { API_URL } from "@env";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
});

api.interceptors.request.use(
  async (request) => {
    const token = mmkvStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default api;
