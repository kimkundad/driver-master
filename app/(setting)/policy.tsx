import { Image, View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
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

    const navigation = useNavigation(); // For Back button functionality

    const data = [
        "ข้อมูลส่วนบุคคลประเภทใดบ้างที่บริษัทฯ เก็บรวบรวม รวมถึงข้อมูลที่ท่านมอบให้แก่บริษัทฯ เกี่ยวกับตัวท่านเองหรือบุคคลที่เกี่ยวข้องกับธุรกิจของท่าน (“ท่าน”) และข้อมูลที่บริษัทฯ ได้รับจากการที่ท่านเป็นลูกค้าของบริษัทฯ",
        "วิธีการที่บริษัทฯ ใช้ข้อมูลส่วนบุคคลของท่าน",
        "ผู้ที่บริษัทฯ อาจเปิดเผยข้อมูลส่วนบุคคลของท่านให้ทราบ",
        "ทางเลือกที่บริษัทฯ นำเสนอให้ท่าน รวมถึงวิธีการเข้าถึงและปรับปรุงข้อมูลส่วนบุคคลของท่านให้เป็นปัจจุบัน",
        "สิทธิที่ท่านมีต่อข้อมูลส่วนบุคคลของท่าน และการคุ้มครองตามกฎหมายที่เกี่ยวข้อง"
    ];
    
    const data2 = [
        "เมื่อท่านใช้บริการจัดส่งพัสดุหรือผลิตภัณฑ์ของบริษัทฯ",
        "การสื่อสารระหว่างท่านและบริษัทฯ ผ่านโทรศัพท์ จดหมาย อีเมล หรือวิธีการอื่น ๆ",
        "เมื่อท่านใช้งานเว็บไซต์หรือแอปพลิเคชันของบริษัทฯ รวมถึงการเก็บข้อมูลผ่านคุกกี้และโปรแกรมติดตามอื่น ๆ",
        "ข้อมูลจากเอกสารหรือแบบสำรวจความเห็นของลูกค้า",
        "กิจกรรมส่งเสริมการขายหรือการแข่งขันที่ท่านเข้าร่วมกับบริษัทฯ"
    ];
    
    const data3 = [
        "ข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล วันเกิด หมายเลขบัตรประชาชน และข้อมูลการติดต่อ",
        "ข้อมูลทางการเงิน เช่น บัญชีธนาคาร เลขบัตรเครดิต",
        "ข้อมูลครอบครัวและข้อมูลการทำธุรกรรม",
        "ข้อมูลอิเล็กทรอนิกส์ เช่น ที่อยู่ IP และบันทึกกิจกรรม",
    ];

    const data4 = [
        "เพื่อพัฒนาการให้บริการด้านการจัดส่งพัสดุ และการตอบสนองความต้องการของท่าน",
        "เพื่อปรับปรุงคุณภาพการให้บริการออนไลน์ให้มีประสิทธิภาพและสะดวกสบาย",
        "เพื่อป้องกันการเข้าถึงบัญชีโดยไม่ได้รับอนุญาต และตรวจสอบการใช้งานบัญชีของท่าน",
        "เพื่อส่งเสริมการขาย นำเสนอข่าวสารและสิทธิประโยชน์ที่ตรงกับความสนใจของท่าน",

        "เพื่อสนับสนุนกิจกรรมการตลาดและการวิเคราะห์ข้อมูล",
        "เพื่อระงับข้อพิพาทหรือข้อขัดแย้งที่อาจเกิดขึ้น",
        "เพื่อปฏิบัติตามกฎหมายและกฎระเบียบที่เกี่ยวข้อง",
    ];


    const renderContent = () => (
        <View style={{ marginTop: 0, }}>

                        <View style={styles.container}>

                            <View style={styles.mt10}>
                            <Text style={styles.textDetail}>
                            เรียน ลูกค้าของบริษัทฯ
                            </Text>
                            <View style={styles.mt10}></View>
                                <Text style={[styles.textDetail]}>
                                บริษัท โหลดมาสเตอร์ โลจิสติกส์ จำกัด ("บริษัทฯ") ให้ความสำคัญกับความเป็นส่วนตัว และมุ่งมั่นที่จะคุ้มครองข้อมูลส่วนบุคคลของท่าน 
                                ("ข้อมูลส่วนบุคคล") ตามกฎหมายไทย
                                </Text>
                                <View style={styles.mt10}></View>
                                <Text style={styles.textDetail}>
                                    ประกาศความเป็นส่วนตัวฉบับนี้อธิบายถึงรายละเอียดดังต่อไปนี้:
                                </Text>

                                <View style={styles.mt10}></View>

                                <FlatList
                                    data={data}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.listItem}>
                                            <Text style={styles.number}>{index + 1}.</Text>
                                            <Text style={styles.textDetail}>{item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                                
                            </View>

                            <View>
                                <Text style={styles.header}>1. การเก็บรวบรวมข้อมูลส่วนบุคคล</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                บริษัทฯ เก็บรวบรวมข้อมูลส่วนบุคคลหลายประเภท ขึ้นอยู่กับสถานการณ์และลักษณะของสินค้า บริการ และ/หรือ ธุรกรรมของท่าน ข้อมูลอาจได้รับจากหลายแหล่ง เช่น:
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={data2}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.listItem}>
                                            <Text style={styles.number}>{index + 1}.</Text>
                                            <Text style={styles.textDetail}>{item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <Text style={styles.textDetail}>
                                    ข้อมูลส่วนบุคคลที่บริษัทฯ ประมวลผลประกอบด้วย (แต่ไม่จำกัดเพียง):
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={data3}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.listItem}>
                                            <Text style={styles.number}>{index + 1}.</Text>
                                            <Text style={styles.textDetail}>{item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>

                            <View>
                                <Text style={styles.header}>2. การใช้ข้อมูลส่วนบุคคล</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                บริษัทฯ ใช้ข้อมูลส่วนบุคคลเพื่อวัตถุประสงค์ที่ชัดเจนและสอดคล้องตามกฎหมาย เช่น:
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={data4}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.listItem}>
                                            <Text style={styles.number}>{index + 1}.</Text>
                                            <Text style={styles.textDetail}>{item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />

                                <View style={styles.mt10}></View>
                                <Text style={styles.textDetail}>
                                ในกรณีที่บริษัทฯ อาศัยฐานผลประโยชน์อันชอบธรรมในการประมวลผลข้อมูล บริษัทฯ 
                                จะพิจารณาว่าผลประโยชน์ดังกล่าวมีความสำคัญกว่าสิทธิของท่าน และจะประมวลผลเฉพาะที่จำเป็นและเหมาะสมเท่านั้น
                                </Text>
                            </View>

                        </View>

                    </View>
    );

    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
            <Stack.Screen
                    options={{
                        headerTransparent: true,
                        headerTitle: 'นโยบายความเป็นส่วนตัว',
                        headerTitleAlign: 'center', // Center the header title
                        headerTitleStyle: {
                            color: 'black',
                            fontFamily: 'Prompt_500Medium',
                            fontSize: 17,
                        },
                        headerStyle: {
                            backgroundColor: '#fff', // Set the background color here
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
            <StatusBar style="dark" />
            <FlatList
                ListHeaderComponent={renderContent}
                data={[]} // ใส่ข้อมูลที่นี่ ถ้าต้องการเพิ่มรายการอื่น
                renderItem={() => null} // ไม่มีข้อมูลเพิ่มเติม
            />
            
        </SafeAreaProvider>
    )
}

export default Policy

const styles = StyleSheet.create({
    backIcon: {
        backgroundColor: 'rgba(50, 209, 145, 0.2)',
        padding: 3,
        borderRadius: 50,
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        marginTop: Platform.select({
            ios: 80,
            android: 75,
        }),
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    number: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 6,
    },
    header: {
        fontSize: 17, 
        fontFamily: 'Prompt_500Medium'
    },
    mt10: {
        marginTop: 10
    },
    textDetail: {
        fontSize: 14, 
        fontFamily: 'Prompt_400Regular',
        flexShrink: 1,
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