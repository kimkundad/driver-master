import { Image, View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, useRouter  } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';


const { width } = Dimensions.get('window');

const Notification = () => {

    const router = useRouter();

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#F5F5F5' }} >
            <StatusBar style="dark" />
            <ScrollView>
                <View style={styles.listItemCon}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                // handle onPress to go back to the previous page
                                router.back();
                                }}
                            >
                                <View style={{ padding: 10 }}>
                                <Ionicons name="chevron-back" size={28} color="black" />
                                </View>
                            
                            </TouchableOpacity>
                        <View style={styles.textListHead} >
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt_500Medium' }}>การแจ้งเตือน</Text>
                        </View>
                        <View style={{ width: 50 }}></View>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 0, }}>

                        
                    <View style={styles.container}>
                        <View style={styles.textStatus}>
                            <View style={styles.showflex}>
                            <Ionicons name="notifications-outline" size={22} color="white" />
                            <View style={{ flex: 1, justifyContent: 'center',  }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Prompt_400Regular' }}> การแจ้งเตือนและข่าวสาร</Text>
                            </View>
                                
                            </View>
                            
                        </View>
                    </View>

                    <View style={styles.card}>

                        <View style={styles.boxNoti}>
                            <View style={styles.showflex2}>
                                <View>
                                    <Text style={styles.header}>การชำระเงิน</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>04 ก.ค. 2567 14:49</Text>
                                </View>
                            </View>
                            
                            <View style={styles.showflex2}>
                                <Text style={styles.detailx}>ท่านได้ทำการชำระเงินเสร็จสิ้นแล้ว ท่านสามารถใช้บริการเครื่อง 16 ได้
                                เลยครับ</Text>
                                <View>
                                    <Feather name="chevron-right" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxNoti}>
                            <View style={styles.showflex2}>
                                <View>
                                    <Text style={styles.header}>WashXpress</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>04 ก.ค. 2567 14:49</Text>
                                </View>
                            </View>
                            
                            <View style={styles.showflex2}>
                                <Text style={styles.detailx}>วันหยุดนี้ มาซักผ้าที่ WashXpress มีทั้งเครื่องซัก เครื่องอบ คอยให้
                                บริการ</Text>
                                <View>
                                    <Feather name="chevron-right" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxNoti}>
                            <View style={styles.showflex2}>
                                <View>
                                    <Text style={styles.header}>การชำระเงิน</Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>04 ก.ค. 2567 14:49</Text>
                                </View>
                            </View>
                            
                            <View style={styles.showflex2}>
                                <Text style={styles.detailx}>ท่านได้ทำการชำระเงินเสร็จสิ้นแล้ว ท่านสามารถใช้บริการเครื่อง 16 ได้
                                เลยครับ</Text>
                                <View>
                                    <Feather name="chevron-right" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                        <View style={styles.boxNoti}>
                            <View style={styles.showflex2}>
                                <View>
                                    <Text style={styles.header}>สิทธิพิเศษเฉพาคุณ! รับฟรี </Text>
                                </View>
                                <View>
                                    <Text style={styles.date}>04 ก.ค. 2567 14:49</Text>
                                </View>
                            </View>
                            
                            <View style={styles.showflex2}>
                                <Text style={styles.detailx}>สิทธิพิเศษเฉพาคุณ! รับฟรี คูปอง มูลค่า09 มิ.ย. 2567 08:33
20 บาท สามารถเข้ามากดรับได้ในแอปฯ</Text>
                                <View>
                                    <Feather name="chevron-right" size={24} color="gray" />
                                </View>
                            </View>
                        </View>
                        


                        <View style={styles.line_bot}></View>
                    </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Notification

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    detailx: {
        fontSize: 14, 
        fontFamily: 'Prompt_400Regular',
        marginTop: 5
    },
    showflex: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10
      },
      boxNoti: {
        padding: 10,
        paddingHorizontal : 10,
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 0.3,
        paddingBottom: 10
      },
      showflex2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    header: {
        fontSize: 16, 
        fontFamily: 'Prompt_500Medium'
    },
    date: {
        fontSize: 12, 
        fontFamily: 'Prompt_400Regular',
        color: '#666'
    },
    mt10: {
        marginTop: 10
    },
    line_bot: {
        borderBottomColor: '#bfbfbf',
        borderBottomWidth: 0.3,
      },
    textStatus: {
        backgroundColor: '#f47524',
        width: 230,
        borderRadius: 99,
        padding: 6,
        paddingHorizontal: 8,
        alignItems: 'center'
      },
    textDetail: {
        fontSize: 14, 
        fontFamily: 'Prompt_400Regular'
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
        width: width, // ความกว้าง 100% ของขนาดหน้าจอ
        height: (width * 202) / 360, // คำนวณความสูงตามอัตราส่วนของภาพ
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
        position: 'static',
        backgroundColor: '#fff',
        borderRadius: 20,
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