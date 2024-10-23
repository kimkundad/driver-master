import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Verify() {
    const navigation = useNavigation();
    const inputRefs = useRef([]); // Array of refs for OTP inputs
    const [otp, setOtp] = useState(new Array(6).fill('')); // OTP stored as an array of 6 characters
    const [loading, setLoading] = useState(false); // Loading state to disable actions while verifying
    const router = useRouter();
    const { phone } = useLocalSearchParams(); // Get phone param from the route
  
    useEffect(() => {
      navigation.setOptions({ headerShown: false });
    }, [navigation]);
  
    // Handle OTP input change
    const handleOtpChange = useCallback((text, index) => {
      const newOtp = [...otp]; // Clone the current OTP array
      newOtp[index] = text; // Update the current index
      setOtp(newOtp); // Update the OTP state
  
      // Auto-focus the next input or move back on deletion
      if (text) {
        index < 5 && inputRefs.current[index + 1]?.focus();
      } else {
        index > 0 && inputRefs.current[index - 1]?.focus();
      }
    }, [otp]);

    const handleReSend = useCallback(async () => {

      setLoading(true);

      try {

        // phone

        const response = await axios.post('https://api.loadmasterth.com/api/reverify', {
          phone_number: phone, // Phone number from params
        });

        if (response.data.pass == 1) {
          // ค่าแสดงว่าเกิน 3 นาทีแล้ว
          Alert.alert('Success', 'OTP has been resent!');
        } else if (response.data.pass == 0) {
          // ค่าแสดงว่ายังไม่เกิน 3 นาที
          Alert.alert('Wait', 'Please wait a few minutes before requesting again.');
        }



      } catch (error) {
        console.error('Invalid phone number entered!:', error);
        Alert.alert('Error', 'Something went wrong, please try again.');
      } finally {
        setLoading(false); // Hide loading state
      }

    }, [phone]);
  
    // Handle OTP submission
    const handleSubmit = useCallback(async () => {
      // Check if the OTP is incomplete
      if (otp.includes('')) {
        Alert.alert('Error', 'Please enter a complete OTP.');
        return;
      }
  
      setLoading(true); // Show loading state
  
      try {
        // Clear existing session data
        await AsyncStorage.removeItem('jwt_token');
        await AsyncStorage.removeItem('refresh_token');
        await AsyncStorage.removeItem('user_profile');

        console.log('otp', phone);
  
        // Make the API call to verify the OTP
        const response = await axios.post('https://api.loadmasterth.comp/api/verify', {
          verification_code: otp.join(''), // Send OTP as a single string
          phone_number: phone, // Phone number from params
        });
  
        console.log('response', response.data);
  
        if (response.data.token) {
          // Extract tokens and user profile from the response
          const token = response.data.token;
          const refreshToken = response.data.token;
          const userProfile = response.data.user;

          console.log('token', token, 'refreshToken', refreshToken, 'userProfile', userProfile);
  
          // Ensure tokens and user data are valid before storing
          if (token && refreshToken && userProfile) {
            // Store tokens and user data in AsyncStorage
            await AsyncStorage.setItem('jwt_token', token);
            await AsyncStorage.setItem('refresh_token', refreshToken);
            await AsyncStorage.setItem('user_profile', JSON.stringify(userProfile));
  
            Alert.alert('Success', 'Verification successful!');
            router.push('(tabs)'); // Navigate to the main app screen
          } else {
            Alert.alert('Error', 'Invalid token or user data received.');
          }
        } else {
          Alert.alert('Error', 'Invalid verification code.');
        }
      } catch (error) {
        console.error('Error during verification:', error);
        Alert.alert('Error', 'Something went wrong, please try again.');
      } finally {
        setLoading(false); // Hide loading state
      }
    }, [otp, phone, router]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={styles.container}>
                <KeyboardAwareScrollView>
                    <View style={styles.topHeader}>
                        <View style={styles.headerBack}>
                            <Link href="(alogin)">
                                <Ionicons name="chevron-back-outline" size={28} color="black" />
                            </Link>
                        </View>
                    </View>

                    <View style={styles.header}>
                        <Text style={styles.title}>OTP Verification</Text>
                        <Text style={styles.subtitle}>Enter the OTP sent to {phone}</Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.otpContainer}>
                            {otp.map((_, index) => (
                                <View key={index} style={styles.otpBox}>
                                    <TextInput
                                        style={styles.otpText}
                                        keyboardType="number-pad"
                                        maxLength={1}
                                        ref={(el) => (inputRefs.current[index] = el)} // Assign refs to inputs
                                        onChangeText={(text) => handleOtpChange(text, index)} // Handle OTP change
                                        value={otp[index]} // Set value from state
                                    />
                                </View>
                            ))}
                        </View>

                        <View>
                          <TouchableOpacity onPress={handleReSend} disabled={loading}>
                            <Text style={styles.btnTextRe}>{loading ? 'ReSending...' : 'ReSend OTP'}</Text>
                          </TouchableOpacity>
                        </View>

                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                                <View style={styles.btn}>
                                <Text style={styles.btnText}>{loading ? 'Verifying...' : 'Verify'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  infoText: {
    marginTop:10,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpBox: {
    borderRadius: 5,
    borderColor: '#666',
    borderWidth: 0.5,
},
btnTextRe: {
  fontSize: 16,
    color: '#f47524',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: '700',
    marginBottom: 20
},
otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
},
otpText: {
    fontSize: 20,
    color: '#000',
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
},
  otp: {
    marginTop: -5,
    fontSize: 14,
 textAlign: 'center',
 color: '#999'
  },
  linkText: {
    color: '#f47524',
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center'
  },
  termTextblue:{
    color: '#0263e0',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#1D2A32',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  /** Header */
  topHeader: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  headerImg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBack: {
    padding: 8,
    paddingTop: 0,
    position: 'relative',
    marginLeft: -16,
  },
  /** Form */
  form: {
    marginBottom: 14,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f47524',
    textAlign: 'center',
    letterSpacing: 0.15,
    marginTop: 30,
    marginBottom: 50
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#121F43',
    borderColor: '#121F43',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});