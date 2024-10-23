import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { UserProvider } from '../../hooks/UserContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Octicons name="home" size={28} color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="history" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="test"
        options={{
          title: 'test',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          ),
        }}
      /> */}
    </Tabs>
    </UserProvider>
  );
}
