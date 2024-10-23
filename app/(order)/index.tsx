import { Image, Text, View, StyleSheet, Platform, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabTwoScreen() {
    return (
        <SafeAreaProvider style={{ flex: 1, backgroundColor: '#f8f8f8' }} >
            <ScrollView>
                <View style={styles.listItemCon}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Link href="/(tabs)" style={{ padding: 10 }}>
                            <Ionicons name="chevron-back" size={30} color="black" />
                        </Link>
                        <View style={styles.textListHead} >
                            <Text style={{ fontSize: 20, fontFamily: 'Prompt_500Medium' }}>Order Detail</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                                router.push('(setting)/notification');
                            }}>
                            <View style={{ width: 50 }}>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.container}>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order type</Text>
                        <View style={styles.orderTypeCard}>
                            <View style={styles.orderTypeInfo}>
                                <Text style={styles.orderTypeTitle}>MIXUE (มี่เสวี่ย)</Text>
                                <Text style={styles.orderTypePrice}>4303690511</Text>
                                <View style={styles.orderTypeDurationWrapper}>
                                    <Text style={styles.orderTypeDuration}>1 day</Text>
                                </View>
                            </View>
                            <Image
                                source={ require('../../assets/images/images.png') } // replace with actual image URL
                                style={styles.orderTypeImage}
                            />
                        </View>
                    </View>

                    {/* Package Detail */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Package detail</Text>
                        <View style={styles.packageDetail}>
                            <View style={styles.packageItem}>
                                <View style={styles.iconLabel}>
                                    <MaterialIcons name="category" size={24} color="gray" />
                                    <Text style={styles.packageItemLabel}>Size</Text>
                                </View>
                                <Text style={styles.packageItemValue}>5 กล่อง</Text>
                            </View>
                            <View style={styles.dottedBorder} />
                            <View style={styles.packageItem}>
                                <View style={styles.iconLabel}>
                                    <MaterialCommunityIcons name="cube-outline" size={24} color="gray" />
                                    <Text style={styles.packageItemLabel}>Category</Text>
                                </View>
                                <Text style={styles.packageItemValue}>ไอศกรีมและชา</Text>
                            </View>
                        </View>
                    </View>

                    {/* Shipping Address */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Shipping address</Text>
                        <View style={styles.addressDetail}>

                            <View style={styles.locationContainer}>
                                <View style={styles.iconTextContainer}>
                                    <MaterialIcons name="home" size={26} color="black" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>ต้นทาง</Text>
                                        <Text style={styles.titleName}>Mixue เคหะร่มเกล้า</Text>
                                        <Text style={styles.subtitle}>401/97 รามคำแหง 166 เขตมีนบุรี กทม. 10510</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.locationContainer2}>
                                <View style={styles.iconTextContainer}>
                                    <Ionicons name="location-outline" size={26} color="black" />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.title}>ปลายทาง</Text>
                                        <Text style={styles.titleName}>คุณนก ชาเย็น สาขาพระรามเก้า</Text>
                                        <Text style={styles.subtitle}>299/7 ถ. เคหะร่มเกล้า แขวงคลองสองต้นนุ่น เขตลาดกระบัง กรุงเทพมหานคร 10520</Text>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>


                    <TouchableOpacity
                        onPress={() => {
                        // handle onPress
                        router.push('(order)/detail');
                        }}>
                        <View style={styles.btn}>
                        <Text style={styles.btnText}>กดรับงาน</Text>
                        </View>
                    </TouchableOpacity>


                </View>


            </ScrollView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    listItemCon: {
        paddingTop: 40,
        paddingHorizontal: 0,
        backgroundColor: '#f8f8f8',

    },
    textListHead: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        fontFamily: 'Prompt_400Regular',
    },
    container: {
        padding: 10,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    bodyContainer: {
        padding: 10,
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
        borderRadius: 20
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
        marginBottom: 30
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        color: '#fff',
        fontFamily: 'Prompt_500Medium',
    },
    section: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    orderTypeCard: {
        backgroundColor: '#FFF1E5', // Background color
        borderRadius: 10,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderTypeInfo: {
        flexDirection: 'column',
    },
    orderTypeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#888',
    },
    orderTypePrice: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    orderTypeDurationWrapper: {
        backgroundColor: '#FBDDC0', // Background color for duration
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        marginTop: 8,
        width: 60
    },
    orderTypeDuration: {
        fontSize: 14,
        color: '#888',
    },
    orderTypeImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    packageDetail: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
    },
    packageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    iconLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    packageItemLabel: {
        fontSize: 14,
        color: '#888',
        marginLeft: 8,
    },
    packageItemValue: {
        fontSize: 14,
        fontFamily: 'Prompt_500Medium',
    },
    dottedBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'dotted',
        marginVertical: 8,
    },
    addressDetail: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
    },
    addressItem: {
        marginBottom: 16,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addressText: {
        fontSize: 14,
        color: '#888',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 16,
    },
    totalPrice: {
        fontSize: 16,
        color: '#888',
    },
    priceValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    processButton: {
        backgroundColor: '#1e90ff',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    processButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    dashedLine: {
        position: 'absolute',
        left: '50%',
        top: 20,
        bottom: 20,
        height: 100,
    },
    locationContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    locationContainer2: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 20
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'Prompt_500Medium',
    },
    titleName: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Prompt_500Medium',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
});
