import { Image, View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const About = () => {
    const navigation = useNavigation(); // For Back button functionality
    
    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
            <StatusBar style="dark" />
            <ScrollView>
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
                                    เกี่ยวกับเรา
                                </Text>
                            </View>

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
                </LinearGradient>
                <View style={styles.container}>
                    <View style={{ marginTop: 0, }}>

                        <View style={{ alignItems: 'center' }}>
                            <Image source={require('../../assets/images/about/man_about.webp')}
                            style={{ width: width, height: width }} />
                        </View>
                        <View style={styles.mt_20}>
                            <Text style={styles.header}>บริษัท โหลดมาสเตอร์ โลจิสติกส์ จำกัด</Text>
                            <Text style={styles.textDetail}>
                            บริษัท โหลดมาสเตอร์ โลจิสติกส์ จำกัด ผู้นำด้านการจัดส่งพัสดุด่วนในประเทศไทย 
                            ก่อตั้งขึ้นในปี พ.ศ. 2549 เราให้ความสำคัญกับการพัฒนาบุคลากรและเทคโนโลยีอย่างต่อเนื่อง 
                            เพื่อมอบประสบการณ์การส่งพัสดุที่ดีที่สุดให้แก่ลูกค้า
                            </Text>
                            <Text style={styles.textDetail}>
                                ปัจจุบันบริษัทมีจุดบริการอยู่ทั่วประเทศไทย ครอบคลุมทุกพื้นที่ในประเทศ
                                เราสามารถรองรับการจัดส่งพัสดุได้ตามจำนวนที่ลูกค้าต้องการ 
                                เพื่อตอบสนองการเติบโตของธุรกิจอีคอมเมิร์ซและธุรกิจอื่นๆ เช่น ธุรกิจค้าปลีกและค้าส่ง 
                                ซึ่งเป็นกลุ่มธุรกิจที่มีส่วนช่วยกระตุ้นเศรษฐกิจไทยให้เติบโตอย่างยั่งยืน
                            </Text>

                            <Text style={styles.textDetail}>
                            บริษัทของเรามุ่งมั่นที่จะให้บริการที่มีคุณภาพสูง เพื่อยกระดับคุณภาพชีวิตของสังคมส่วนรวม 
                            พร้อมทั้งให้ความใส่ใจต่อพนักงาน และมีความรับผิดชอบต่อผู้มีส่วนได้เสียและนักลงทุน
                            </Text>

                            <Text style={styles.textDetail}>
                            เราเต็มใจที่จะเป็นผู้ประกอบการด้านการจัดส่งพัสดุด่วนชั้นนำในประเทศไทย 
                            โดยมุ่งเน้นการให้บริการที่ดีเลิศและเหนือความคาดหวังของลูกค้า
                            </Text>
                        </View>
                        

                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider>
    )
}

export default About

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
    backIcon: {
        backgroundColor: 'rgba(50, 209, 145, 0.2)',
        padding: 3,
        borderRadius: 50,
    },
    container: {
        padding: 20,
    },
    mt_20:{
        marginTop: 15
    },
    header: {
        color: '#093250',
        fontSize: 18, 
        fontFamily: 'Prompt_500Medium',
        textAlign: 'center'
    },
    
    mt10: {
        marginTop: 10
    },
    textDetail: {
        fontSize: 14, 
        fontFamily: 'Prompt_400Regular',
         textAlign: 'center',
         color: '#595a5c',
         marginTop: 10,
         lineHeight: 20
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