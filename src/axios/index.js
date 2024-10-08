import axios from 'axios'
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from '../utils/helper';

export const API = axios.create({
    baseURL: 'http://127.0.0.0:3001/api',
    timeout: 60000,
});

API.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        
        if (!config.headers.Authorization) {
            config.headers.Authorization = accessToken;
        }
        return config
    }
)

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config
        if (error.response && error.response.status === 401 && !originalRequest._retry) {

            console.log('Handle 401 error, e.g., redirect to login or refresh token ...');
            
            originalRequest._retry = true;

            const accessToken = getAccessToken();
            const refreshToken = getRefreshToken();
            return API.post(
              '/auth/refresh',
              {
                // token: accessToken,
                refreshToken: refreshToken,
              },
              { byPassToken: false },
            ).then((res) => {
              const {
                data: {
                  data: { access, refresh },
                },
              } = res
      
              originalRequest.headers.Authorization = access
      
              if (access) setAccessToken(access)
              if (refresh) setRefreshToken(refresh)

              return axios(originalRequest);
            });
        }
        return Promise.reject(error)
    },
)