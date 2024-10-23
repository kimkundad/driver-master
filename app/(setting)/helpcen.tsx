import { Image, View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const { width } = Dimensions.get('window');


const Helpcen = () => {
    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
            <StatusBar style="dark" />
            <ScrollView>
                <View style={styles.listItemCon}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Link href="/(tabs)/profile" style={{ padding: 10 }}>
                            <Ionicons name="chevron-back" size={30} color="black" />
                        </Link>
                        <View style={styles.textListHead} >
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt_500Medium' }}>Help Center</Text>
                        </View>
                        <View >
                            <Ionicons style={{ padding: 10 }} name="notifications-outline" size={27} color="black" />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 0, }}>

                        <View style={styles.container}>

                        <View style={{ alignItems: 'center' }}>
                        <Image source={require('../../assets/images/help.png')}
                            style={{ width: 360, height: 202 }} />
                            <View>
                                <Text style={{ 
                    color:Colors.black, fontSize:18, fontFamily: 'Prompt_500Medium', marginTop: 10, marginBottom: 20
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

                            <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <Feather name="phone" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> 0958467417</Text>
                                    </View>
                                </View>
                                
                            </View>
                            
                            <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <Entypo name="email" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> LoadMaster@gmail.com</Text>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <Ionicons name="chatbubble-ellipses-outline" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> Line ID : @mac2hand</Text>
                                    </View>
                                </View>
                                
                            </View>
                            <View style={styles.textListHead2}>
                                <View style={styles.profile}>
                                    <View>
                                        <FontAwesome name="fax" size={24} color="black" />
                                    </View>
                                    <View>
                                        <Text style={ styles.textSeting}> 064025xxxx</Text>
                                    </View>
                                </View>
                                
                            </View>


                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Helpcen

const styles = StyleSheet.create({

    container: {
        padding: 20,
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
    textListHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        fontFamily: 'Prompt_400Regular',
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
        paddingTop: 40,
        paddingHorizontal: 0,
        backgroundColor: '#fff',
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