import React, { useState, useEffect } from 'react';
import { useNavigation, router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const token = await AsyncStorage.getItem('jwt_token');
        
        if (token) {
          // If token exists, navigate to the main app screen
          router.push('(tabs)');
        }
      } catch (error) {
        console.error('Error checking JWT token:', error);
      }
    };

    checkTokenAndRedirect();
  }, [router]);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please enter both phone and password');
      return;
    }

    //setLoading(true);

    try {
      console.log('try')
      // Replace with your API endpoint
      const response = await axios.post('https://170e-124-120-218-0.ngrok-free.app/api/login', {
        phone: form.email,
        password: form.password,
      });
      

      // Handle different `verify` statuses
      const { token, verify, user } = response.data;
      console.log('Response verify:', response.data);
      
      if (verify === 0) {
        // The user has not verified their phone number, prompt them to verify OTP
        Alert.alert('Verification Required', 'Please verify your phone number with the OTP.');
        router.push('/verify'); // Redirect to OTP verification screen

        router.push({ pathname: '(alogin)/verify', params: { phone: '+66'+form.email } });

      } else if (verify === 1 && token) {
        // User is logged in successfully, save the tokens and user info
        await AsyncStorage.setItem('jwt_token', token);
        await AsyncStorage.setItem('refresh_token', token); // Assuming refresh_token is the same as the token here
        await AsyncStorage.setItem('user_profile', JSON.stringify(user));
        
        Alert.alert('Success', 'Login successful!');
        router.push('(tabs)'); // Navigate to the main app screen after successful login
      } else if (verify === 2) {
        // Invalid credentials
        Alert.alert('Error', 'Invalid phone number or password.');
      } else {
        // Fallback case if something else happens
        Alert.alert('Error', 'Something went wrong, please try again.');
      }

    } catch (error) {
      console.log('Error during login:', error);
    
      if (error.response) {
        // Server responded with a status other than 2xx
        console.log('Error response status:', error.response.status);
        console.log('Error response data:', error.response.data);
        Alert.alert('Error', `Server responded with an error: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // No response was received after the request was sent
        console.log('No response received:', error.request);
        Alert.alert('Error', 'No response received from server. Please check your internet connection or try again later.');
      } else {
        // Something else went wrong while setting up the request
        console.log('Error setting up the request:', error.message);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/logo_write.jpg')}
              style={{ width: 200, height: 200 }}
            />
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="092XXXXXXX"
                onChangeText={(email) => setForm({ ...form, email })}
                placeholderTextColor="#6b7280"
                keyboardType='number-pad'
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleLogin} disabled={loading}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
          onPress={() => router.push('/forgot')}
          style={{ marginTop: 'auto' }}>
            <Text style={styles.formLink}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          onPress={() => router.push('/register')}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
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
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#121F43',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#121F43',
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
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});