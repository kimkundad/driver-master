import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRouter, useLocalSearchParams, Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Resetpass() {

    const navigation = useNavigation();
    const inputRefs = useRef([]); // Array of refs for OTP inputs
    const [loading, setLoading] = useState(false); // Loading state to disable actions while verifying
    const router = useRouter();
    const { phone } = useLocalSearchParams(); // Get phone param from the route

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
      });

       // Centralized form handler to reduce repetitive code
  const handleInputChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

      const handleSubmit = async () => {

        console.log('phone', phone)
        const { password, confirmPassword } = form;

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
          }
      
          setLoading(true); // Show loading state

        try {

            const response = await axios.post('https://api.loadmasterth.com/api/reserPass', {
                password,
                c_password: confirmPassword,
                phone
              });
      
            //   if (response.data.pass == 1) {
            //     // ค่าแสดงว่าเกิน 3 นาทีแล้ว
            //     Alert.alert('Success', 'OTP has been resent!');
            //   } else if (response.data.pass == 0) {
            //     // ค่าแสดงว่ายังไม่เกิน 3 นาที
            //     Alert.alert('Wait', 'Please wait a few minutes before requesting again.');
            //   }

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

      };
  

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
                        <Text style={styles.title}>Reset Password</Text>
                    </View>

                    <View style={styles.form}>
                        {[
                        { placeholder: 'Password (min 8 characters)', value: form.password, field: 'password', secure: true },
                        { placeholder: 'Confirm Password', value: form.confirmPassword, field: 'confirmPassword', secure: true }
                        ].map(({ placeholder, value, field, secure = false, keyboardType = 'default' }, index) => (
                        <View key={index} style={styles.input}>
                            <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="while-editing"
                            secureTextEntry={secure}
                            keyboardType={keyboardType}
                            onChangeText={(text) => handleInputChange(field, text)}
                            placeholder={placeholder}
                            placeholderTextColor="#6b7280"
                            style={styles.inputControl}
                            value={value}
                            />
                        </View>
                        ))}

                        
                        <View style={styles.formAction}>
                            <TouchableOpacity onPress={handleSubmit} disabled={loading}>
                                <View style={styles.btn}>
                                <Text style={styles.btnText}>{loading ? 'Sending OTP...' : 'Send OTP'}</Text>
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