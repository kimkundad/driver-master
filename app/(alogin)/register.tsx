import React, { useState, useEffect } from 'react';
import { Link, useNavigation, router } from 'expo-router';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios'; // Ensure axios is imported

export default function Register() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  // Centralized form handler to reduce repetitive code
  const handleInputChange = (name, value) => {
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleRegister = async () => {
    const { phone, password, confirmPassword, name } = form;

    if (!phone || !password || !confirmPassword || !name) {
      Alert.alert('Error', 'กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true); // Show loading state

    try {
      // API call to register the user
      const response = await axios.post('https://170e-124-120-218-0.ngrok-free.app/api/register', {
        phone,
        name,
        password,
        c_password: confirmPassword,
        role:4
      });
      // console.log('response', response)
      if (response.data.success) {
        
        Alert.alert('Success', 'Registration successful!');
        router.push({ pathname: '(alogin)/verify', params: { phone: response.data.phone_number } });
      } else {
        Alert.alert('Error', response.data.message || 'Registration failed.');
      }

    } catch (error) {
      console.log('Error during registration:', error);
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
            <Text style={styles.title}>Create a personal account</Text>
          </View>

          <View style={styles.form}>
            {/* Input fields mapped from the state */}
            {[
              { placeholder: 'Full Name', value: form.name, field: 'name' },
              { placeholder: 'Phone number', value: form.phone, field: 'phone', keyboardType: 'number-pad' },
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

            <Text style={styles.infoText}>
              By clicking Sign Up below, you've read the full text and agreed to the{' '}
              <Text style={styles.linkText}>Terms & Conditions</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>.
            </Text>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleRegister} disabled={loading}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <Text style={styles.otp}>You will receive an SMS</Text>
          </View>

          <TouchableOpacity onPress={() => router.push('(alogin)')} style={{ marginTop: 'auto' }}>
            <Text style={styles.formFooter}>
              Already have an account? <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
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
  otp: {
    marginTop: -5,
    fontSize: 14,
 textAlign: 'center',
 color: '#999'
  },
  linkText: {
    color: '#f47524',
    fontWeight: '700',
    lineHeight: 18
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
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#929292',
  },
  /** Header */
  topHeader: {
    marginVertical: 16,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 24,
    paddingHorizontal: 24,
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