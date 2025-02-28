import { Image, View, Text, StyleSheet, Platform, TextInput, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get('window');

const Policy = () => {

    const navigation = useNavigation(); // For Back button functionality
    const { i18n, t } = useTranslation();

    const renderContent = () => (
        <View style={{ marginTop: 0, }}>

                        <View style={styles.container}>

                            <View style={styles.mt10}>
                            
                            <View style={styles.mt10}></View>
                                <Text style={[styles.textDetail]}>
                                {t("policy.introduction")}
                                </Text>
                                <View style={styles.mt10}></View>
                                <Text style={styles.textDetail}>
                                {t("policy.introduction2")}
                                </Text>

                                <View style={styles.mt10}></View>

                                <FlatList
                                    data={t("policy.data_collection0", { returnObjects: true })}
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
                                <Text style={styles.header}>{t("policy.section3_title")}</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                {t("policy.section4_title")}
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={t("policy.data_collection", { returnObjects: true })}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.listItem}>
                                            <Text style={styles.number}>{index + 1}.</Text>
                                            <Text style={styles.textDetail}>{item}</Text>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <Text style={styles.textDetail}>
                                {t("policy.section5_title")}
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={t("policy.data_collection2", { returnObjects: true })}
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
                                <Text style={styles.header}>{t("policy.section2_title")}</Text>
                            </View>
                            <View style={styles.mt10}>
                                <Text style={styles.textDetail}>
                                {t("policy.text1")}
                                </Text>
                                <View style={styles.mt10}></View>
                                <FlatList
                                    data={t("policy.data_collection3", { returnObjects: true })}
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
                                {t("policy.text2")}
                                </Text>
                            </View>

                        </View>

                    </View>
    );

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
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, }}>
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
                                {t("setting.policy")}
                                </Text>
                            </View>
                            

                            {/* ใช้ View เปล่าทางขวาเพื่อให้ไอคอน Back และ Text อยู่ตรงกลาง */}
                            <View style={{ width: 32 }} />
                        </View>

                    </View>
                </LinearGradient>
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    textListHead: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        fontFamily: 'Prompt_400Regular',
    },
    container: {
        padding: 20,
        backgroundColor: '#fff',
        // marginTop: Platform.select({
        //     ios: 80,
        //     android: 75,
        // }),
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