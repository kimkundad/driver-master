// auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; // Assuming this is where you have axios setup

export const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const response = await api.post('/refresh-token', { refreshToken });
    const newToken = response.data.token;
    await AsyncStorage.setItem('jwt_token', newToken);
    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('jwt_token');
    await AsyncStorage.removeItem('refresh_token');
    // Navigate to login page
  } catch (error) {
    console.error('Failed to log out:', error);
  }
};