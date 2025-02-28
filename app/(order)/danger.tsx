import { StyleSheet, Image, Button, Text, View, Alert, FlatList, Dimensions, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MapViewDirections from 'react-native-maps-directions';
import { Link, useNavigation, router, Stack, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import api from '../../hooks/api'; // Axios instance
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');
const buttonSize = width / 3 - 28; // Adjust size to fit 3 buttons in a row

export default function Tracking() {

  const navigation = useNavigation(); // สำหรับปุ่ม Back
  const { selectedLat, selectedLng, province, id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  // Prepopulate state with one initial camera button
  const [files, setFiles] = useState([{ id: '1', uri: null }]);
  const [notes, setNotes] = useState(''); // State to store text input value
  const [deletedImages, setDeletedImages] = useState([]); // Store IDs of deleted images
  const [locationSend, setLocationSend] = useState<{ latitude: number; longitude: number } | null>(null);
  const [formData, setFormData] = useState(null);
  const [getProvince, setGetProvince] = useState(null);
  const [getNo, setGetNo] = useState(3);
  const { i18n, t } = useTranslation();

  const [form, setForm] = useState({
    remark: '',
  });

  useEffect(() => {
    // ตรวจสอบว่ามี id หรือไม่ก่อนที่จะดึงข้อมูล
    if (!id) return;

    const fetchOrder = async () => {


      try {
        const response = await api.get(`/getImgStep3/${id}`);
        console.log('response', response.data)
        const orderData = response.data.img.map((image) => ({
            id: image.id.toString(),
            uri: `${image.image}`, // Concatenate base URL with image path
            newImage: false,
        }));

        setFiles(orderData);
        setNotes(response?.data?.order?.remark_dri3);

        if(!province){
          setGetProvince(response?.data?.order?.province_dan)
          setLocationSend({
            latitude: response?.data?.order?.selectedLat_dan,
            longitude: response?.data?.order?.selectedLng_dan,
          });
        }
        
    } catch (error) {
        console.error('Error fetching order:', error);
        Alert.alert('Error', 'Failed to load images');
    }
        
    };
  
      fetchOrder(); // เรียกฟังก์ชันดึงข้อมูลเมื่อ id เปลี่ยนแปลง
    
    
  }, [id]); // Depend on id to refetch when it changes


  useEffect(() => {
    if (selectedLat && selectedLng && province) {
      console.log('Updating location and province:', selectedLat, selectedLng, province);
      setTimeout(() => {
        setLocationSend({
          latitude: selectedLat,
          longitude: selectedLng,
        });
        setGetProvince(province);
      }, 0);
    }
  }, [selectedLat, selectedLng, province]);

  // Function to add new camera button
  const addNewButton = () => {
    const newButton = { id: Date.now().toString(), uri: null }; // Create new button with unique ID
    setFiles([...files, newButton]); // Add button to state
  };

  // Function to remove a button
  const removeButton = (id) => {
    const imageToRemove = files.find((file) => file.id === id);

    if (imageToRemove && !imageToRemove.newImage) {
      // Track deleted image IDs
      setDeletedImages((prev) => [...prev, id]);
    }

    // Remove the image from the files state
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  // Open the camera to capture a photo
  const openCamera = async (id) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera access is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log('Captured Image Result:', result); // Debugging purpose

    if (!result.cancelled) {
      const uri = result.assets ? result.assets[0].uri : result.uri; // Handle new structure
      console.log('Captured Image URI:', uri); // Debugging purpose

      // Update the button with the captured image
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === id ? { ...file, uri, newImage: true } : file
        )
      );
    }
  };


  const renderCameraButton = ({ item }) => (
    <View style={[styles.imageWrapper, { width: buttonSize, height: buttonSize }]}>
      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => openCamera(item.id)}
      >
        {item.uri ? (
          <Image source={{ uri: item.uri }} style={styles.imagePreview} />
        ) : (
          <MaterialIcons name="photo-camera" size={40} color="white" />
        )}
      </TouchableOpacity>
      {/* Close (X) Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => removeButton(item.id)}>
        <Ionicons name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );


  const renderContent = () => (
    <View style={styles.container}>

      {getProvince ? (

<View style={styles.boxItemList}>
<TouchableOpacity 
onPress={() => 
  router.push({
    pathname: '(order)/mapsDestination',
    params: {
      id
    }, // Pass the order id as a parameter
  })
}
>
  <View style={styles.locationsBox}>
    <View style={styles.myflex}>
      <FontAwesome name="map-marker" size={24} color="black" />
      <Text style={styles.TextMap2}>{getProvince}</Text>
    </View>
    <Entypo name="chevron-small-right" size={26} color="black" />
  </View>
</TouchableOpacity>
</View>

      ) : (

        <View style={styles.boxItemList}>
        <TouchableOpacity 
        onPress={() => 
          router.push({
            pathname: '(order)/mapsDestination',
            params: {
              id
            }, // Pass the order id as a parameter
          })
        }
        >
          <View style={styles.locationsBox}>
            <View style={styles.myflex}>
              <FontAwesome name="map-marker" size={24} color="black" />
              <Text style={styles.TextMap}>ค้นหาที่อยู่บนแผนที่</Text>
            </View>
            <Entypo name="chevron-small-right" size={26} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      )}
      

      <View style={{ marginTop: 10, alignItems: 'center' }}>
      <FlatList
        data={files}
        renderItem={renderCameraButton}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.buttonContainer}
      />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={addNewButton}>
        <Ionicons name="add" size={40} color="gray" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>{t('detail.remark')}</Text>
      <TextInput
        style={styles.textArea}
        placeholder="รายละเอียดเพิ่มเติม..."
        value={notes}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setNotes(text)}
      />

      <TouchableOpacity onPress={handleCreate} disabled={loading} style={styles.btn}>
          <Text style={styles.btnText}>{loading ? `${t('profile.Updating')}...` : `${t('profile.Update')}`}</Text>
      </TouchableOpacity>
    </View>
  );


  const handleCreate = async () => {
    setLoading(true); // Start loading
    console.log('locationSend content:', locationSend);
    if (!locationSend || !getProvince || !notes) {
      Alert.alert('Error', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      setLoading(false);
      return;
    }

    try {
        // Prepare FormData
        const formData = new FormData();

        // Append text fields to FormData
        formData.append('id', id);
        formData.append('remark_dri1', notes);
        formData.append('stepNo', getNo);

        formData.append('selectedLat', selectedLat);
        formData.append('selectedLng', selectedLng);
        formData.append('province', getProvince);

        // Filter new images and add them to FormData
        const newImages = files.filter((file) => file.newImage);
        newImages.forEach((file, index) => {
            formData.append('images[]', {
                uri: file.uri,
                name: `image_${index}.jpg`,
                type: 'image/jpeg',
            });
        });

        // Add deleted image IDs to FormData
        formData.append('deletedImages', JSON.stringify(deletedImages));

        console.log('FormData content:', formData); // For debugging

        // Make the POST request with the FormData payload
        const response = await api.post('/postImgStep1', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Handle API response
        if (response.data.msgStatus === 200) {
            Alert.alert('สำเร็จ', 'เพิ่มสำเร็จแล้ว');
            
            router.push({
                pathname: '(order)/detail',
                params: { id: id }, // Pass the branch id as a parameter
              });

            // router.push('(branch)'); // Uncomment if you want to navigate after success
        } else {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเพิ่มข้อมูลได้');
        }
    } catch (error) {
        console.error('API Error:', error); // Debugging purposes
        Alert.alert('ข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
        setLoading(false); // Stop loading
    }
};


  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#f5f5f5' }} >
      <LinearGradient
                    colors={['#1e3c72', '#1e3c72', '#2a5298']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.listItemCon}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.btnBack} onPress={() => router.push({
              pathname: '(order)/detail',
              params: { id: id }, // Pass the branch id as a parameter
            }) }>
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
                                {t('detail.Report')}
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
                </LinearGradient>

      <View style={{  }}>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
      />
      </View>

    </SafeAreaProvider>
  );
}

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
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cameraButton: {
    flex: 1,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
    elevation: 3,
  },
  buttonContainer: {
    justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
  flexGrow: 1, // Ensures the content takes up space evenly
  },
  addButton: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  backIcon: {
    backgroundColor: 'rgba(50, 209, 145, 0.2)',
    padding: 3,
    borderRadius: 50,
  },
  ImgFrist: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  camera: {
    borderWidth: 0.5, // Specifies the width of the bottom border
    borderColor: '#000',
    borderRadius: 10
  },
  textArea: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 0,
    fontFamily: 'Prompt_400Regular',
    backgroundColor: '#fff',
    textAlignVertical: 'top', // For Android to align text at the top
  },
  showflexCamera: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Prompt_500Medium',
    marginBottom: 8,
    marginTop: 15
  },
  locationsBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8
  },
  myflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  TextMap: {
    fontSize: 16,
    fontFamily: 'Prompt_400Regular',
    color: '#999',
  },
  TextMap2: {
    fontSize: 16,
    fontFamily: 'Prompt_400Regular',
    color: '#000',
  },
  
  boxItemList: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow (elevation)
    elevation: 0.8,
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
    marginTop: 20,
    marginBottom: 10
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#fff',
    fontFamily: 'Prompt_500Medium',
  }
});