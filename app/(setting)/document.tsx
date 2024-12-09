import { Image, Text, View, StyleSheet, Switch, Platform, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';

export default function Document() {

    const navigation = useNavigation(); // สำหรับปุ่ม Back
    const [documentStatuses, setDocumentStatuses] = useState({});


    useEffect(() => {
        const fetchDocumentStatuses = async () => {
            try {

                const response = await api.get('/getDoc');
                
                console.log('doc', response.data.doc)
                // Transform the response data into an object for easy access
                const statusMap = {};
                response.data.doc.forEach(doc => {
                    statusMap[doc.stepNo] = doc.status;
                });
                setDocumentStatuses(statusMap);
            } catch (error) {
                console.error('Error fetching document statuses:', error);
                Alert.alert('Error', 'Failed to load document statuses');
            }
        };

        fetchDocumentStatuses();
    }, []);

    const getIconColor = (stepNo) => {
        return documentStatuses[stepNo] === 1 ? "#2aa866" : "#999";
    };

    const renderDocumentItem = (textHead, textDetail, stepNo, label) => (
        <TouchableOpacity
            onPress={() => {
                router.push({
                    pathname: '(setting)/upDoc',
                    params: {
                        textHead,
                        textDetail,
                        myStep: stepNo
                    },
                });
            }}
        >
            <View style={styles.shipmentCard}>
                <View style={styles.shipmentDetails}>
                    <Text style={styles.textMenu}>{label}</Text>
                    <Feather name="check-circle" size={20} color={getIconColor(stepNo)} />
                </View>
            </View>
        </TouchableOpacity>
    );

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
                                    เอกสารใช้ยืนยัน
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
            </LinearGradient>

            <View style={styles.container}>

                <View style={{ marginTop: 20 }}>

                {renderDocumentItem(
                'รูปสมุดบัญชี',
                'อัพโหลดรูปสมุดบัญชี โดยชื่อบัญชีต้องตรงกับชื่อที่ได้ลงทะเบียนกับทางระบบไว้',
                1,
                'สมุดบัญชี'
            )}
            {renderDocumentItem(
                'รูปใบขับขี่',
                'อัพโหลดรูปใบขับขี่ โดยชื่อบัญชีต้องตรงกับชื่อที่ได้ลงทะเบียนกับทางระบบไว้',
                2,
                'ใบขับขี่'
            )}
            {renderDocumentItem(
                'ใบอนุญาตขับรถสาธารณะ',
                'อัพโหลดใบอนุญาตขับรถสาธารณะ โดยชื่อบัญชีต้องตรงกับชื่อที่ได้ลงทะเบียนกับทางระบบไว้',
                3,
                'ใบอนุญาตขับรถสาธารณะ'
            )}
            {renderDocumentItem(
                'รูปบัตรประชาชน',
                'อัพโหลดรูปบัตรประชาชน โดยชื่อบัญชีต้องตรงกับชื่อที่ได้ลงทะเบียนกับทางระบบไว้',
                4,
                'บัตรประชาชน'
            )}
            {renderDocumentItem(
                'รูปเอกสารประกันภัย',
                'อัพโหลดเอกสารประกันภัย โดยชื่อบัญชีต้องตรงกับชื่อที่ได้ลงทะเบียนกับทางระบบไว้',
                5,
                'เอกสารประกันภัย'
            )}

                </View>
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
    textMenu: {
        fontFamily: 'Prompt_400Regular',
        fontSize: 14,
        color: '#000'
    },
    shipmentCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    shipmentDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    backIcon: {
        backgroundColor: 'rgba(50, 209, 145, 0.2)',
        padding: 3,
        borderRadius: 50,
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
        padding: 20,
        backgroundColor: '#fff',

        flex: 1,
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