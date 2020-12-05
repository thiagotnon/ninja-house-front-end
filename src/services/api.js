import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
});

const apiImage = axios.create({
  baseURL: "http://127.0.0.1:3333/api/v1",
  headers: {
    "content-type": "multipart/form-data;",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export { api, apiImage };
