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
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";

// Get screen width to calculate button size for 3 columns
const { width } = Dimensions.get('window');
const buttonSize = 300; // Adjust size to fit 3 buttons in a row
const imageHeight = 300; // Fixed height of 400

export default function UpDoc() {
    const navigation = useNavigation(); // For Back button functionality
    const { textHead, myStep, textDetail } = useLocalSearchParams(); // รับพารามิเตอร์ id
    const [loading, setLoading] = useState(false);
    // Prepopulate state with one initial camera button
    const [files, setFiles] = useState([{ id: '1', uri: null }]); 
    const { i18n, t } = useTranslation(); // ใช้ i18n สำหรับการจัดการภาษา

    useEffect(() => {
        (async () => {
            if (!myStep) return;
    
            const fetchOrder = async () => {
                const stepNumber = Array.isArray(myStep) ? parseInt(myStep[0], 10) : parseInt(myStep, 10);
    
                try {
                    const response = await api.get(`/getImgDoc/${stepNumber}`);
                    if (response?.data?.dataStatus === 200 && response?.data?.img?.name) {
                        const imageUri = response.data.img.name;
                        setFiles([{ id: '1', uri: imageUri }]);
                        console.log('Fetched Image URI:', imageUri);
                    }
                } catch (error) {
                    console.error('Error fetching order:', error);
                    Alert.alert('Error', 'Failed to load images');
                }
            };
    
            fetchOrder();
        })();
    }, [myStep]);

    const handleCreate = async () => {
        setLoading(true); // Start loading

        try {
            // Prepare FormData
            const formData = new FormData();
    
            // Append text fields to FormData
            formData.append('stepNo', myStep);
    
            // Filter new images and add them to FormData
            const newImages = files.filter((file) => file.newImage);
            newImages.forEach((file, index) => {
                formData.append('images', {
                    uri: file.uri,
                    name: `image_${index}.jpg`,
                    type: 'image/jpeg',
                });
            });
    
            // Make the POST request with the FormData payload
            const response = await api.post('/postDoc', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Handle API response
            if (response.data.msgStatus === 200) {
                Alert.alert('สำเร็จ', 'เพิ่มสำเร็จแล้ว');
                
                navigation.navigate('document');
    
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

    const selectImageSource = (id) => {
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                { text: 'Take Photo', onPress: () => openCamera(id) },
                { text: 'Choose from Gallery', onPress: () => openGallery(id) },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

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
            const uri = result.uri || (result.assets ? result.assets[0].uri : null);
            updateFileWithUri(id, uri);
        }
        }
    

    const openGallery = async (id) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Gallery access is required to choose photos.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const uri = result.uri || (result.assets ? result.assets[0].uri : null);
            updateFileWithUri(id, uri);
        }
    };

    const updateFileWithUri = (id, uri) => {
        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.id === id ? { ...file, uri, newImage: true } : file
            )
        );
    };

    const renderCameraButton = ({ item }) => (
        <View style={[styles.imageWrapper, { width: buttonSize, height: imageHeight }]}>
            <TouchableOpacity
                style={styles.cameraButton}
                onPress={() => selectImageSource(item.id)}
            >
                {item?.uri ? (
                    <Image source={{ uri: item.uri }} style={styles.imagePreview} />
                ) : (
                    <MaterialIcons name="photo-camera" size={40} color="white" />
                )}
            </TouchableOpacity>
        </View>
    );


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <LinearGradient
                    colors={['#1e3c72', '#1e3c72', '#2a5298']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    style={styles.headerGradient}
                >
                    <View style={styles.listItemCon}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                            <TouchableOpacity style={styles.btnBack} onPress={() => router.push('(setting)/document')}>
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
                                    {textHead}
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
            </LinearGradient>

                <View style={styles.container}>
                    {/* FlatList to render camera buttons in 3 columns */}
                   
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.textDetail}> {textDetail}</Text>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                    <FlatList
                        data={files}
                        renderItem={renderCameraButton}
                        keyExtractor={(item) => item.id}
                        numColumns={1} // Adjust for layout if necessary
                        contentContainerStyle={{ alignItems: 'center' }}
                    />
                    </View>
               

                    <View style={styles.formAction}>
                        <TouchableOpacity onPress={handleCreate} disabled={loading}>
                            <View style={styles.btn}>
                            <Text style={styles.btnText}>{loading ? `${t('profile.Updating')}...` : `${t('profile.Update')}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </TouchableWithoutFeedback>
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
    textDetail: {
        fontFamily: 'Prompt_400Regular',
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20
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
