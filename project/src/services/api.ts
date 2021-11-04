import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from './token';

const baseURL = 'https://8.react.pages.academy/wtw/';
const timeout = 5000;

enum HttpCode  {
  Unauthorized = 401,
}

export const createAPI = (onUnauthorized:() => void) : AxiosInstance => {
  const api = axios.create({
    baseURL: baseURL,
    timeout: timeout,
  });

  api.interceptors.response.use(
    (response:AxiosResponse) => response,

    (error:AxiosError) => {
      const {response} = error;

      if (response?.status === HttpCode.Unauthorized) {
        onUnauthorized();
      }

      return Promise.reject(error);
    },


  );

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
