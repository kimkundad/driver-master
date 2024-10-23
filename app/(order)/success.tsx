import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { Link, useNavigation, router } from 'expo-router';

export default function Success() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconContainer}>
        <Svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Circle cx="12" cy="12" r="12" fill="#34C759"/>
          <Path d="M17 8L10 15L7 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </Svg>
      </View>
      <Text style={styles.title}>ส่งมอบสินค้าสำเร็จ!</Text>
      <Text style={styles.subtitle}>เมื่อคุณทำภารกิจสำเร็จแล้ว คุณสามารถกดปุ่ม ยืนยันความสำเร็จ เพื่อทำภารกิจต่อไป</Text>
      <TouchableOpacity style={styles.button} onPress={() => {
                        // handle onPress
                        router.push('/(tabs)');
                        }}>
        <Text style={styles.buttonText}>ยืนยันความสำเร็จ</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Prompt_500Medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Prompt_400Regular',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Prompt_500Medium',
  },
});