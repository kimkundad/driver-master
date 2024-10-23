import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    FlatList,
    Dimensions,
    Alert,
    Image,
    TextInput,
} from 'react-native';
import { Stack, useNavigation, router, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as ImagePicker from 'expo-image-picker';
import api from '../../hooks/api'; // Axios instance
import * as Location from 'expo-location';
import provinceData from '../../assets/raw/raw_database.json';

// Get screen width to calculate button size for 3 columns
const { width } = Dimensions.get('window');
const buttonSize = width / 3 - 28; // Adjust size to fit 3 buttons in a row

export default function FileUploadScreen() {
    const navigation = useNavigation(); // For Back button functionality
    const { id, textHead, myStep } = useLocalSearchParams(); // รับพารามิเตอร์ id
    const [loading, setLoading] = useState(false);
    // Prepopulate state with one initial camera button
    const [files, setFiles] = useState([{ id: '1', uri: null }]); 
    const [notes, setNotes] = useState(''); // State to store text input value
    const [deletedImages, setDeletedImages] = useState([]); // Store IDs of deleted images
    const [pickedLocation, setPickedLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [province, setProvince] = useState('');
    const [getAddress, setGetAddress] = useState(null);

    useEffect(() => {
        (async () => {
        // ตรวจสอบว่ามี id หรือไม่ก่อนที่จะดึงข้อมูล
        if (!id) return;

        const fetchOrder = async () => {

            const stepNumber = Array.isArray(myStep) ? parseInt(myStep[0], 10) : parseInt(myStep, 10);

            if(stepNumber === 1){

                try {
                    const response = await api.get(`/getImgStep1/${id}`);
            
                    const orderData = response.data.img.map((image) => ({
                        id: image.id.toString(),
                        uri: `${image.image}`, // Concatenate base URL with image path
                        newImage: false,
                    }));
            
                    setFiles(orderData);
                    setNotes(response?.data?.order?.remark_dri1);
                } catch (error) {
                    console.error('Error fetching order:', error);
                    Alert.alert('Error', 'Failed to load images');
                }

            }else{

                try {
                    const response = await api.get(`/getImgStep2/${id}`);
            
                    const orderData = response.data.img.map((image) => ({
                        id: image.id.toString(),
                        uri: `${image.image}`, // Concatenate base URL with image path
                        newImage: false,
                    }));
            
                    setFiles(orderData);
                    setNotes(response?.data?.order?.remark_dri2);
                } catch (error) {
                    console.error('Error fetching order:', error);
                    Alert.alert('Error', 'Failed to load images');
                }

            }
            
        };
      
          fetchOrder(); // เรียกฟังก์ชันดึงข้อมูลเมื่อ id เปลี่ยนแปลง


          let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Permission to access location was denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });

            setPickedLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });

            const address = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });

            if (address && address.length > 0) {
                console.log('address', address);
            
                const zipcode = address[0].postalCode;
                setGetAddress(address[0].formattedAddress)
                // Find matching province from JSON based on postal code
                const provinceEntry = provinceData.find(
                  (entry) => entry.zipcode.toString() === zipcode
                );
            
                if (provinceEntry) {
                  setProvince(provinceEntry.province);
                  console.log('Matched Province:', provinceEntry.province);
                } else {
                  console.warn('Province not found for this postal code');
                }
              }
        
        })();
      }, [id , myStep]); // Depend on id to refetch when it changes

    

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


const handleCreate = async () => {
    setLoading(true); // Start loading

    try {
        // Prepare FormData
        const formData = new FormData();

        // Append text fields to FormData
        formData.append('id', id);
        formData.append('remark_dri1', notes);
        formData.append('stepNo', myStep);
        formData.append('getAddress', getAddress);

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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Stack.Screen
                    options={{
                        headerTransparent: true,
                        headerTitle: ' '+textHead,
                        headerTitleStyle: {
                            color: 'black',
                            fontFamily: 'Prompt_500Medium',
                            fontSize: 18,
                        },
                        headerLeft: () => (
                            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                                <View style={{ backgroundColor: Colors.white, padding: 6, borderRadius: 50 }}>
                                    <Ionicons name="chevron-back" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
                        ),
                    }}
                />

                <View style={styles.container}>
                    {/* FlatList to render camera buttons in 3 columns */}
                    <FlatList
                        data={files}
                        renderItem={renderCameraButton}
                        keyExtractor={(item) => item.id}
                        numColumns={3} // Display in 3 columns
                        contentContainerStyle={styles.buttonContainer}
                    />

                    {/* Add Button */}
                    <TouchableOpacity style={styles.addButton} onPress={addNewButton}>
                        <Ionicons name="add" size={40} color="gray" />
                    </TouchableOpacity>

                    {/* Text Area Input */}
                    <TextInput
                        style={styles.textArea}
                        placeholder="รายละเอียดเพิ่มเติม..."
                        placeholderTextColor="#888"
                        multiline={true}
                        numberOfLines={4}
                        value={notes}
                        onChangeText={(text) => setNotes(text)}
                    />

               

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={handleCreate} disabled={loading}>
                            <View style={styles.btn}>
                            <Text style={styles.btnText}>{loading ? 'กำลังบันทึกข้อมูล...' : 'บันทึกข้อมูล'}</Text>
                            </View>
                        </TouchableOpacity>
                        </View>


                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        marginTop: Platform.select({
            ios: 80,
            android: 75,
        }),
        flex: 1,
    },
    textArea: {
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        fontFamily: 'Prompt_400Regular',
        backgroundColor: '#fff',
        textAlignVertical: 'top', // For Android to align text at the top
    },
    formAction: {
        marginTop: 4,
        marginBottom: 16,
      },
      btn: {
        marginTop: 10,
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
        fontFamily: 'Prompt_500Medium',
        color: '#fff',
      },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    imageWrapper: {
        position: 'relative',
        margin: 5,
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
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});
