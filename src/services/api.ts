import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getToken, setLogout } from "./auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

api.interceptors.request.use(async (config) => {
  const token = getToken();

  if (token) {
    if (!config) {
      config = {
        headers: {} as AxiosRequestHeaders,
      };
    }
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      setLogout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const handleRequest = async (request: AxiosRequestConfig) => {
  try {
    const response = await api(request);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default api;
