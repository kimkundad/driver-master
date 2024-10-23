import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api'; // Axios instance
import { useNavigation } from '@react-navigation/native'; // React Navigation

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [userBranch, setUserBranch] = useState([]);
  const navigation = useNavigation(); // Access navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        //console.log('Retrieved token:', token); // Debug token retrieval
        const dataUser = await AsyncStorage.getItem('user_profile');
        //console.log('Retrieved user profile:', dataUser);

        if (dataUser) {
          setUserProfile(JSON.parse(dataUser));
        }

        const ordersResponse = await api.get('/user-order');
        if (ordersResponse) {
          setUserOrders(ordersResponse.data.order);
        }

        const branchResponse = await api.get('/user-branch');
      //  console.log('branch response----> 1:', branchResponse.data);
        if (branchResponse) {
          setUserBranch(branchResponse.data.branch);
        }

      } catch (error) {
        console.error('Failed to retrieve user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('jwt_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('user_profile');
      setUserProfile(null);
      setUserOrders([]);
      // Navigate to login screen or another appropriate action
      navigation.navigate('(alogin)'); // Ensure 'Login' matches your route name
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile , userOrders, setUserOrders, logout, userBranch, setUserBranch }}>
      {children}
    </UserContext.Provider>
  );
};