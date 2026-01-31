import axios, { InternalAxiosRequestConfig } from 'axios';
import { useAppStore } from '../store';
import { API_URL } from '@env';
import { resetAllSlices } from '@/store/utils';

// local storage

// SeTTing up base url

export const API = axios.create({
  baseURL: API_URL,
});

export const AUTH_API = axios.create({
  baseURL: API_URL,
});

/*
 ** Before every api request following be taken
 1 - we are getting accessToken as well as refresh token from the api
 2 - then we are decoding accesToken by external library
 3 - then we are cheking the xpiry time for the token
 4 - if the token is expire then we calling api to get latest token from the server
 5 - if token is not expire we are simply injecting our accessToken into header
 */
/*
 ** This mechnism every time when request gets
 */
API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // getting access token
    const { accessToken, refreshToken } = useAppStore.getState().tokens;
    console.log('accessToken accessToken', accessToken);
    console.log('refreshToken refreshToken', refreshToken);

    config.headers = config.headers || {}; // Ensure headers object exists

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (refreshToken) {
      config.headers['x-refresh-token'] = refreshToken;
    }

    config.headers['x-device-id'] = 'test-device-id';
    config.headers['x-user-agent'] = 'android';

    if (!config.headers['Content-Type'] && !config.headers['content-type']) {
      config.headers['Content-Type'] = 'application/json';
    }

    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);
/*
 ** When axios returns something
 */
API.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    /*
     ** Checking if token gets expire
     */

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const { refreshToken } = useAppStore.getState().tokens;

      if (refreshToken) {
        try {
          // Import here to avoid circular dependency
          const {
            refreshTokenService,
          } = require('../store/authSlice/authApiService');
          const newTokens = await refreshTokenService(refreshToken);

          if (newTokens && newTokens.accessToken) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            return API(originalRequest);
          }
        } catch (refreshError) {
          console.log('🚀 ~ refreshError:', refreshError);
          resetAllSlices();
          return Promise.reject(refreshError);
        }
      } else {
        resetAllSlices();
      }
    }
    return Promise.reject(error);
  },
);
/*
 ** When axios return something
 */

AUTH_API.interceptors.response.use(
  (request: any) => request,
  (error: any) => {
    return Promise.reject(error);
  },
);
