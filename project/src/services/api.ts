import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const baseURL = 'https://8.react.pages.academy/wtw/';
const timeout = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['X-Token'] = token;
      }

      return config;
    },
  );

  return api;
};
