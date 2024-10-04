import axios from 'axios'
import { getAccessToken } from '../utils/helper';

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
        if (error.response && error.response.status === 401) {
        // Handle 401 error, e.g., redirect to login or refresh token
        }
        return Promise.reject(error)
    },
)