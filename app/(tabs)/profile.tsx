import { Image, Text, View, StyleSheet, Alert, Switch, Platform, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../hooks/UserContext';
import api from '../../hooks/api'; // Axios instance
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from "react-i18next";

export default function Profile() {

  const { logout } = useContext(UserContext);
  const { userProfile, setUserProfile } = useContext(UserContext);
  const [files, setFiles] = useState(null); // Holds URI of selected image
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for API call

  const { i18n, t } = useTranslation(); // ใช้ i18n สำหรับการจัดการภาษา
  // ฟังก์ชันแสดงข้อความภาษา
  const getLanguageDisplay = () => {
    switch (i18n.language) {
      case "th-TH":
        return "ภาษาไทย (TH)";
      case "en-US":
        return "English (US)";
      case "zh-CN":
        return "中文 (自动翻译)";
      default:
        return "Language"; // ค่าดีฟอลต์
    }
  };

  useEffect(() => {

    setIsEnabled(userProfile?.noti === 1);
    console.log('API Response userProfile?.noti:', userProfile?.noti);

  }, [userProfile]); // Depend on id to refetch when it changes


  const toggleSwitch = async () => {
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);

    try {
      const response = await api.post('/notiStatus', {
        id: userProfile?.id,
        newStatus: newStatus ? 'เปิด' : 'ปิด' // เปลี่ยนข้อความตามที่คุณต้องการในฐานข้อมูล
      });
      console.log('API Response:', response?.data?.data?.user); // Log ข้อมูลจาก API
      const updatedUser = response?.data?.data?.user;
      await AsyncStorage.setItem('user_profile', JSON.stringify(updatedUser));


    } catch (error) {
      console.error('API Error:', error.toJSON());
      Alert.alert('ข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to open image picker and set the profile image
  const openImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.status !== 'granted' || cameraPermissionResult.status !== 'granted') {
      Alert.alert('Permission required', 'Camera and gallery access are required to upload a profile picture.');
      return;
    }

    Alert.alert(
      'Upload Profile Picture', 
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
            if (!result.cancelled) {
              console.log('New Image URI:', result.uri); // Check URI
              setFiles(result.uri || result?.assets?.[0]?.uri);
              await uploadImage(result?.assets?.[0]?.uri);
            }
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: async () => {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images, // Allow only images
              allowsEditing: true,
              quality: 1,
            });
            if (!result.cancelled) {
              console.log('New Image URI:', result.uri); // Check URI
              setFiles(result.uri || result?.assets?.[0]?.uri);
              await uploadImage(result?.assets?.[0]?.uri);
            }
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };


   // Function to upload image to the server
   const uploadImage = async (uri) => {
    setLoading(true); // Start loading

    try {
        const formData = new FormData();
        formData.append('images', {
            uri: uri,
            name: `avatar_${Date.now()}.jpg`, // Generate a unique filename
            type: 'image/jpeg',
        });

        // Assuming `api` is configured with your base URL and headers
        const response = await api.post('/UpAvatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Handle API response
        if (response.data.msgStatus === 200) {
          console.log('user-->', response.data?.user)
          const updatedUser = response.data.user;
          await AsyncStorage.setItem('user_profile', JSON.stringify(updatedUser));
          setUserProfile(updatedUser); // Update UserContext

            Alert.alert('Success', 'Profile picture updated successfully');
        } else {
            Alert.alert('Error', 'Failed to update profile picture');
        }

    } catch (error) {
        console.error('API Error:', error);
        Alert.alert('Error', error.message || 'An error occurred while uploading');
    } finally {
        setLoading(false); // Stop loading
    }
};



const handleDeleteAccount = async () => {
  Alert.alert(
    "Confirm Account Deletion",
    "Are you sure you want to delete your account? This action cannot be undone.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
              
              const response = await api.post('/delete_account');

              Alert.alert("Account Deleted", "Your account has been successfully deleted.");

              // หน่วงเวลา 5 วินาทีแล้วค่อย Logout 584
              setTimeout(async () => {
                  await logout();
              }, 5000);

          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong. Please try again later.");
          }
        },
      },
    ]
  );
};

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: () => (
                  <Text
                    style={{
                      color: '#000',
                      fontFamily: 'Prompt_500Medium',
                      fontSize: 18,
                      textAlign: 'center',
                    }}
                  >
                    {t('profile.header')}
                  </Text>
                ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#000', // กำหนดสีของ headerTitle
          fontFamily: 'Prompt_500Medium', // กำหนดฟอนต์
          fontSize: 18,
        },
      }} />
      <ScrollView>


        <View style={styles.container}>

          <View style={styles.bodyContainer}>


            <View style={{ alignItems: 'center', paddingTop: 15 }}>

              
              {/* Container for image and edit button */}
              <View style={{ position: 'relative' }}>
                {/* Profile Image */}



                <Image
                  key={files}
                  style={styles.userImageCenter}
                  source={{
                    uri: files || userProfile?.avatar || 'https://wpnrayong.com/admin/assets/media/avatars/300-12.jpg',
                }}
                />


                {/* Edit Button */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    backgroundColor: '#fff', // Background for better visibility
                    borderRadius: 50,
                    padding: 4,
                  }}
                  onPress={openImagePicker}
                >
                  <MaterialIcons name="edit" size={18} color="black" />
                </TouchableOpacity>
              </View>

              {/* User Details */}
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  color: '#000', fontSize: 18, fontFamily: 'Prompt_500Medium',
                }}>
                  {userProfile?.name}
                </Text>
                <View style={styles.showflex}>
                  <Text style={{
                    color: '#000', fontSize: 14, fontFamily: 'Prompt_500Medium', fontWeight: '700', marginRight: 5
                  }}>
                    {t('profile.code')}
                  </Text>
                  <Text style={{
                    color: '#000', fontSize: 14, fontFamily: 'Prompt_400Regular',
                  }}>
                    {userProfile?.code_user} 
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.line_bot}></View>


            {/* Menu Setting */}
            <View style={{ marginTop: 8 }}>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  router.push('(setting)');
                }}>
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <AntDesign name="user" size={20} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.editProfile')} </Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  router.push('(setting)/document');
                }}>
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <Ionicons name="document-outline" size={20} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.document')}</Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  router.push('(setting)/language');
                }}>
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <Entypo name="language" size={20} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.Language')}</Text>
                    </View>
                  </View>

                  <View>
                    <View style={styles.showflex}>
                      <View style={{ marginRight: 10 }}>
                        <Text style={styles.textSeting2}>{getLanguageDisplay()}</Text>
                      </View>
                      <Feather name="chevron-right" size={24} color="black" />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  router.push('(setting)/helpcen');
                }}>
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <Feather name="phone" size={20} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.Help')} </Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <View >
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <Ionicons name="notifications-outline" size={24} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.Notification')}</Text>
                    </View>
                  </View>
                  <View>
                    <Switch
                      trackColor={{ false: '#767577', true: '#81b0ff' }}
                      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
              </View>
              <View >
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                    router.push('(setting)/policy');
                  }}>
                  <View style={styles.textListHead2}>
                    <View style={styles.profile}>
                      <View>
                        <MaterialIcons name="lock-outline" size={20} color="black" />
                      </View>
                      <View>
                        <Text style={styles.textSeting}>{t('profile.policy')}</Text>
                      </View>
                    </View>
                    <View>
                      <Feather name="chevron-right" size={24} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                  router.push('(setting)/about');
                }}>
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <Feather name="info" size={20} color="black" />
                    </View>
                    <View>
                      <Text style={styles.textSeting}>{t('profile.About')} </Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="black" />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
              >
                <View style={styles.textListHead2}>
                  <View style={styles.profile}>
                    <View>
                      <AntDesign name="logout" size={20} color="#dc3545" />
                    </View>
                    <View>
                      <Text style={styles.textSeting3}>{t('profile.Logout')}</Text>
                    </View>
                  </View>
                  <View>
                    <Feather name="chevron-right" size={24} color="#dc3545" />
                  </View>
                </View>
              </TouchableOpacity>

              

            </View>
            {/* Menu Setting */}


            

          </View>


          <TouchableOpacity
                                onPress={handleDeleteAccount}
                                style={{ marginTop: 40 }}
                            >
                                <View style={styles.textListHead3}>
                                    <View style={styles.profile}>
                                       
                                        <View style={styles.obtnRed}>
                                            <View
                                                style={{
                                                    padding: 6,
                                                    borderRadius: 50
                                                }}
                                            >
                                                <Ionicons name="trash-bin-outline" size={20} color="#dc3545" />
                                            </View>
                                        </View>

                                        <View>
                                            <Text style={styles.textSeting3}>Delete Account</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  listItemCon: {
    paddingTop: 40,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    textAlign: 'center'

  },
  textListHead3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical:8,
    borderColor: '#dc3545',
    borderWidth: 0.3,
    borderRadius: 20,
    marginBottom: 30
},
  showflex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImageCenter: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  textSeting: {
    fontSize: 16,
    fontFamily: 'Prompt_400Regular'
  },
  textSeting2: {
    fontSize: 15,
    fontFamily: 'Prompt_400Regular',
    color: '#3858b1'
  },
  textListHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: 'Prompt_400Regular',
  },
  textSeting3: {
    fontSize: 15,
    fontFamily: 'Prompt_400Regular',
    color: '#dc3545'

  },
  line_bot: {
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 0.3,
    paddingBottom: 20
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  textListHead2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingBottom: 12
  },
  container: {
    padding: 10,
    paddingHorizontal: 12,
    marginTop: Platform.select({
      ios: 75,
      android: 65,
    }),
  },
  bodyContainer: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  boxWhite: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 345, // Full width of the screen
    height: 120,  // Set the height as needed
    borderRadius: 35
  },
});
