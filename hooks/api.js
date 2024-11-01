import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosRetry from 'axios-retry';
import { useNavigation } from '@react-navigation/native';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://170e-124-120-218-0.ngrok-free.app/api',
});

// Configure retry logic
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => error.response && error.response.status === 429,
});

// Refresh token function
const refreshToken = async () => {
  try {
    const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
    if (!storedRefreshToken) {
      throw new Error('No refresh token found');
    }

    console.log('Attempting token refresh with:', storedRefreshToken);

    // Request new token using refresh token
    const response = await axios.post(
      'https://170e-124-120-218-0.ngrok-free.app/api/refresh-token',
      {},
      {
        headers: { Authorization: `Bearer ${storedRefreshToken}` },
      }
    );

    const newToken = response.data.token;
    if (!newToken) {
      throw new Error('Failed to receive new token');
    }

    console.log('New token received:', newToken);

    // Store the new token in AsyncStorage
    await AsyncStorage.setItem('jwt_token', newToken);
    return newToken;
  } catch (error) {
    console.error('Token refresh failed:', error.response?.data || error.message);
    throw error; // Ensure error is thrown to handle logout or retry logic
  }
};

// Request interceptor to add JWT token to headers
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt_token');
 //   console.log('token api', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration and retry logic
api.interceptors.response.use(
  (response) => {
    // Check if the response indicates an expired token (even if the status is 200)
    if (response.data.message === "Token expired" && !response.config._retry) {
      response.config._retry = true; // Mark the request as retried

      return refreshToken().then(newToken => {
        // Update the authorization header with the new token
        response.config.headers.Authorization = `Bearer ${newToken}`;
        // Retry the original request with the updated token
        return api(response.config);
      }).catch(error => {
        console.error("Failed to refresh token:", error);
        return Promise.reject(error);
      });
    }

    // Return the response if no token issues were found
    return response;
  },
  (error) => {
    // Handle other types of errors (like 401 or network issues)
    return Promise.reject(error);
  }
);

export default api;