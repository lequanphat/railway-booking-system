import Axios from 'axios';
import { BACKEND_ENDPOINT } from '~/config/env';
import LocalStorageManager from '~/utils/localStorageManager';

let isRefreshing = false;

function authRequestInterceptor(config) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: BACKEND_ENDPOINT,
});

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await fetch(`${BACKEND_ENDPOINT}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: LocalStorageManager.getRefreshToken(),
            }),
          });

          if (!response.ok) {
            LocalStorageManager.resetAccessToken();
            LocalStorageManager.resetRefreshToken();
            isRefreshing = false;
            return Promise.reject(error);
          }

          const { token, refreshToken } = await response.json();
          LocalStorageManager.setAccessToken(token);
          LocalStorageManager.setRefreshToken(refreshToken);
          isRefreshing = false;

          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return api(originalRequest);
        } catch (e) {
          return Promise.reject(e);
        }
      }
    }

    return Promise.reject(error);
  },
);
