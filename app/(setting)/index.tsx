import { Image, View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,Platform, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useContext, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router, Stack, useNavigation } from 'expo-router';
import api from '../../hooks/api'; // Axios instance
import { UserContext } from '../../hooks/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';


const EditProfile = () => {

  const navigation = useNavigation(); // สำหรับปุ่ม Back

  const { userProfile, setUserProfile } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  // Populate the form with userProfile data when the component mounts
  useEffect(() => {
    if (userProfile) {
      setForm({
        name: userProfile?.name || '',
        phone: userProfile?.phone || '',
        email: userProfile?.email || '',
      });
    }
  }, [userProfile]);

  const handleUpdateProfile = async () => {
    if (!form.name || !form.phone || !form.email) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoading(true); // Start loading
    try {
     
      const response = await api.post('/updateProfile', form);
      console.log('form', response.data)
      if (response.data.msgStatus === 200) {
        const updatedUser = response.data.user;
        await AsyncStorage.setItem('user_profile', JSON.stringify(updatedUser));
        setUserProfile(updatedUser); // Update UserContext
        Alert.alert('Success', 'Profile updated successfully');
        router.push('(tabs)/profile'); // Navigate to settings page
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while updating the profile');
      console.error('Update Profile Error:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <LinearGradient
                    colors={['#1e3c72', '#1e3c72', '#2a5298']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.listItemCon}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.btnBack} onPress={() => router.push('(tabs)/profile')}>
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        padding: 5,
                                        borderRadius: 25
                                    }}
                                >
                                    <Ionicons name="chevron-back" size={20} color="black" />
                                </View>
                            </TouchableOpacity>

                            <View style={styles.textListHead}>
                                <Text style={{ fontSize: 18, fontFamily: 'Prompt_500Medium', color: '#fff', textAlign: 'center' }}>
                                    แก้ไขข้อมูลส่วนตัว
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
            </LinearGradient>
      <ScrollView>
        
        
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>ชื่อ-นามสกุล</Text>
              <TextInput
                clearButtonMode="while-editing"
                placeholder="kim kundad"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.name}
                onChangeText={(name) => setForm({ ...form, name })}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>เบอร์ติดต่อ</Text>
              <TextInput
                keyboardType="number-pad"
                placeholder="09578512xxx"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phone}
                onChangeText={(phone) => setForm({ ...form, phone })}
                editable={false}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>อีเมล</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="email@email.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
                onChangeText={(email) => setForm({ ...form, email })}
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity onPress={handleUpdateProfile} disabled={loading}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{loading ? 'Updating...' : 'Update'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>


      </ScrollView>
    </SafeAreaProvider>
  );
};

export default EditProfile;


const styles = StyleSheet.create({
  headerGradient: {
    height: 85,
    width: '100%',
},
btnBack: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    padding: 4,
    alignItems: 'center',
},
textListHead: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    fontFamily: 'Prompt_400Regular',
},
row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
},
listItemCon: {
    marginTop: Platform.select({
        ios: 35,
        android: 35,
    }),
    paddingHorizontal: 0,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    // Android shadow (elevation)
    elevation: 10,
},
container: {
  padding: 20,
  backgroundColor: '#fff',

  flex: 1,
},
  backIcon: {
    backgroundColor: 'rgba(50, 209, 145, 0.2)',
    padding: 3,
    borderRadius: 50,
},
 
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
    fontFamily: 'Prompt_500Medium',
  },
  label: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14
  },
  formAction: {
  
    marginTop: 10,
    marginBottom: 50
  },
  iconAdd: {
    color: '#f47524',
  },
  addBranch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 1
  },
  form: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerPage: {
    padding: 20,
    fontFamily: 'Prompt_500Medium',
    fontSize: 18,
    marginTop: -5
  },
  input: {
    marginBottom: 10,
  },
  inputLabel: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 14,
    fontWeight: '600',
    color: '#121F43',
    marginBottom: 8,
  },
  inputControl: {
    height: 45,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
  },

  card: {
    paddingTop: 15,
    position: 'static',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    padding: 10,
  },
  headBranch: {
    fontFamily: 'Prompt_500Medium',
    fontSize: 15,
    marginTop: -3
  },
  phoneText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 12,
    marginTop: -5
  },
  addressText: {
    fontFamily: 'Prompt_400Regular',
    fontSize: 11,
    lineHeight: 15,
    marginTop: 5,
    height: 30,
    color: '#666'
  },
  innerItem: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 1,
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5, // Specifies the width of the bottom border
    borderBottomColor: '#d7d7d7',
  },
});