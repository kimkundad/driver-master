import { Image, View, Text, StyleSheet, Platform, TextInput, Linking, Alert, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
import React, { useState, useEffect  } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import api from '../../hooks/api'; // Axios instance

const { width } = Dimensions.get('window');



const Helpcen = () => {

    const [dataSetting, setDataSetting] = useState(null);

    const fetchData = async () => {

        try {
          const response = await api.get(`/getSetting`);
          const settingData = response.data.set;
          setDataSetting(settingData);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
    
      };
    
      useEffect(() => {
        fetchData();
      }, []);


      const handlePress = async () => {

        const url = `tel:${dataSetting?.phone}`;
        try {
          await Linking.openURL(url);
        } catch (error) {
          Alert.alert('Error', 'Unable to make a phone call');
          console.error('Error:', error);
        }
     
    };
    
    const handleLinePress = async () => {
        const lineUrl = dataSetting?.line_oa_url; // Link to Line Add Friend page
    
        try {
            const supported = await Linking.canOpenURL(lineUrl);
            if (supported) {
                await Linking.openURL(lineUrl);
            } else {
                Alert.alert(
                    'Cannot Open Line',
                    'It seems Line app is not installed or supported on your device.'
                );
            }
        } catch (error) {
            console.error('An error occurred', error);
            Alert.alert('Error', 'An unexpected error occurred while trying to open Line.');
        }
    };
    
    const handleEmailPress = async () => {
      const email = dataSetting?.email;
      const url = `mailto:${email}`;
    
      try {
          const supported = await Linking.canOpenURL(url);
          if (supported) {
              await Linking.openURL(url);
          } else {
              Alert.alert(
                  'Email Not Supported',
                  'No email app is available to open this link. Please configure an email client and try again.'
              );
          }
      } catch (error) {
          console.error('An error occurred', error);
          Alert.alert('Error', 'An unexpected error occurred while trying to open the email app.');
      }
    };
  

    const navigation = useNavigation(); // For Back button functionality

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
            
            <StatusBar style="dark" />
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
                                    ศูนย์ช่วยเหลือ
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
                </LinearGradient>
            <ScrollView>
               
               
                <View>
                    <View style={{ marginTop: 0, }}>

                        <View style={styles.container}>

                        <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/help_center.webp')}
                            style={{ width: 360, height: 202, marginBottom: 10, borderRadius: 8 }} />
                            <View>
                                <Text style={{ 
                    color:Colors.black, fontSize:17, fontFamily: 'Prompt_500Medium', marginTop: 10, marginBottom: 20
                    }}>
                                    อยากให้เราช่วยเรื่องอะไร บอกมาได้เลย
                                </Text>
                            </View>
                        </View>
                        

                        <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> แชทพูดคุยกับเรา</Text>
                                    </View>
                                </View>
                                
                            </View>

                            <View style={styles.textListHead2} >
                                <TouchableOpacity onPress={handlePress}>
                                <View style={styles.profile}>
                                    <View>
                                        <Feather name="phone" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> {dataSetting?.phone}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.textListHead2}>
                                <TouchableOpacity onPress={handleEmailPress}>
                                    <View style={styles.profile}>
                                        <View>
                                            <Entypo name="email" size={24} color="black" />
                                        </View>
                                        <View>
                                            <Text style={ styles.textSeting}> {dataSetting?.email}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.textListHead2}>
                            <TouchableOpacity onPress={handleLinePress}>
                                <View style={styles.profile}>
                                    <View>
                                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> Line ID : {dataSetting?.line_oa}</Text>
                                    </View>
                                </View>
                                </TouchableOpacity>
                                
                            </View>
                            {/* <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <FontAwesome name="fax" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> 064025xxxx</Text>
                                    </View>
                                </View>
                                
                            </View> */}


                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Helpcen

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
    container: {
        padding: 20,
        // marginTop: Platform.select({
        //     ios: 80,
        //     android: 75,
        // }),
        flex: 1,
    },
    textListHead2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 0.5,
        paddingBottom: 20
    },
    textSeting : {
        fontSize: 16, 
        fontFamily: 'Prompt_400Regular'
      },
    image: {
        width: width, // Full width of the screen
        height: 200,  // Set the height as needed
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    contactBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 15,
        borderColor: '#666',
        borderRadius: 99,
        width: 200,
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
    headerPage: {
        padding: 20,
        fontFamily: 'Prompt_500Medium',
        fontSize: 18,
        marginTop: -5
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
    card: {
        marginTop: -5,
        position: 'static',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10
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