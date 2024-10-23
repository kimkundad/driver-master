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

const Policy = () => {
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
                            <Text style={{ fontSize: 18, fontFamily: 'Prompt_500Medium' }}>Privacy Policy</Text>
                        </View>
                        <View >
                            <Ionicons style={{ padding: 10 }} name="notifications-outline" size={27} color="black" />
                        </View>
                    </View>
                </View>
                <View>
                    <View style={{ marginTop: 0, }}>

                        <View style={styles.container}>

                            <View>
                                <Text style={styles.header}>1. ข้อกําหนดทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                    1.1
                                    ผู้ใช้บริการตกลงที่จะปฏิบัติและผูกพันตามเงื่อนไขการให้บริการ
                                    ซึ่งการใช้บริการของผู้ใช้บริการถือเป็นการยอมรับเงื่อนไขการให้บริการนี้
                                    โดยบริษัทอาจแก้ไข หรือเพิ่มเติมเงื่อนไขการให้บริการได้
                                    ไม่ว่าในเวลาใด โดยบริษัทจะแจ้งให้ผู้ใช้บริการทราบ
                                    และการที่ผู้ใช้บริการใช้บริการต่อไปภายหลังจากที่มีการแก้ไข
                                    หรือเพิ่มเติมดังกล่าว ย่อมถือเป็นการยอมรับการแก้ไข
                                    หรือเพิ่มเติมในแต่ละครั้ง
                                </Text>
                                <Text style={styles.textDetail}>
                                    1.2 เว้นแต่จะได้มีการแจ้ง หรือกําหนดไว้เป็นอย่างอื่น
                                    คุณลักษณะใหม่ ๆ ที่ได้แก้ไข เพิ่มเติม
                                    หรือปรับปรุงในบริการให้ถือว่าอยู่ภายใต้เงื่อนไขการให้บริการฉบับนี้ทั้งสิ้น
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.header}>2. ข้อกำหนดและเงื่อนไขการใช้บริการทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                            </View>


                            <View>
                                <Text style={styles.header}>1. ข้อกําหนดทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                    1.1
                                    ผู้ใช้บริการตกลงที่จะปฏิบัติและผูกพันตามเงื่อนไขการให้บริการ
                                    ซึ่งการใช้บริการของผู้ใช้บริการถือเป็นการยอมรับเงื่อนไขการให้บริการนี้
                                    โดยบริษัทอาจแก้ไข หรือเพิ่มเติมเงื่อนไขการให้บริการได้
                                    ไม่ว่าในเวลาใด โดยบริษัทจะแจ้งให้ผู้ใช้บริการทราบ
                                    และการที่ผู้ใช้บริการใช้บริการต่อไปภายหลังจากที่มีการแก้ไข
                                    หรือเพิ่มเติมดังกล่าว ย่อมถือเป็นการยอมรับการแก้ไข
                                    หรือเพิ่มเติมในแต่ละครั้ง
                                </Text>
                                <Text style={styles.textDetail}>
                                    1.2 เว้นแต่จะได้มีการแจ้ง หรือกําหนดไว้เป็นอย่างอื่น
                                    คุณลักษณะใหม่ ๆ ที่ได้แก้ไข เพิ่มเติม
                                    หรือปรับปรุงในบริการให้ถือว่าอยู่ภายใต้เงื่อนไขการให้บริการฉบับนี้ทั้งสิ้น
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.header}>2. ข้อกำหนดและเงื่อนไขการใช้บริการทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.header}>1. ข้อกําหนดทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                    1.1
                                    ผู้ใช้บริการตกลงที่จะปฏิบัติและผูกพันตามเงื่อนไขการให้บริการ
                                    ซึ่งการใช้บริการของผู้ใช้บริการถือเป็นการยอมรับเงื่อนไขการให้บริการนี้
                                    โดยบริษัทอาจแก้ไข หรือเพิ่มเติมเงื่อนไขการให้บริการได้
                                    ไม่ว่าในเวลาใด โดยบริษัทจะแจ้งให้ผู้ใช้บริการทราบ
                                    และการที่ผู้ใช้บริการใช้บริการต่อไปภายหลังจากที่มีการแก้ไข
                                    หรือเพิ่มเติมดังกล่าว ย่อมถือเป็นการยอมรับการแก้ไข
                                    หรือเพิ่มเติมในแต่ละครั้ง
                                </Text>
                                <Text style={styles.textDetail}>
                                    1.2 เว้นแต่จะได้มีการแจ้ง หรือกําหนดไว้เป็นอย่างอื่น
                                    คุณลักษณะใหม่ ๆ ที่ได้แก้ไข เพิ่มเติม
                                    หรือปรับปรุงในบริการให้ถือว่าอยู่ภายใต้เงื่อนไขการให้บริการฉบับนี้ทั้งสิ้น
                                </Text>
                            </View>

                            <View>
                                <Text style={styles.header}>2. ข้อกำหนดและเงื่อนไขการใช้บริการทั่วไป</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                                <Text style={styles.textDetail}>
                                2.1.1 ผู้ใช้บริการที่มีสัญชาติไทย ต้องกรอกชื่อ-นามสกุล มล หมายเลขโทรศัพท์เคลื่อนที่ ที่อยู่ อาชีพ สถานที่ทำงน วันเดือนปีเกิด และเลขประจำตัวประชาชนของตนเอง
                                รวมทั้งข้อมูลอื่น ๆ ตามที่บริษัทกำหนด หรือจะกำหนดต่อไป เพื่อให้เป็นไปตามวัตถุประสงค์ในการให้บริการของบริษัทและ/หรือกฎหมายที่เกี่ยวข้อง
                                </Text>
                            </View>

                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default Policy

const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    header: {
        fontSize: 16, 
        fontFamily: 'Prompt_500Medium'
    },
    mt10: {
        marginTop: 10
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