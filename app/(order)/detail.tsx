import { StyleSheet, Image, Button, Switch, Text, View, Platform, Linking, ScrollView, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MapViewDirections from 'react-native-maps-directions';
import { Link, useNavigation, router, useLocalSearchParams, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useState, useEffect } from 'react';
import api from '../../hooks/api'; // Axios instance
import DeviveryStatus from '../../components/DeviveryStatus';
import { useTranslation } from "react-i18next";

export default function Tracking() {


  const navigation = useNavigation(); // สำหรับปุ่ม Back

  const { id, xlatitude } = useLocalSearchParams(); // รับพารามิเตอร์ id
  console.log('')
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDtcFHSNerbvIWPVv5OStj-czBq_6RMbRg';

  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [order, setData] = useState(null);
  const [origin, setOrigin] = useState({ latitude: 13.5116094, longitude: 100.68715 }); // เก็บตำแหน่งต้นทาง
  const [destination, setDestination] = useState({ latitude: 13.5116094, longitude: 100.68715 }); // เก็บตำแหน่งปลายทาง
  const [carTack, setCarTack] = useState({ latitude: 0, longitude: 0 }); // เก็บตำแหน่งปลายทาง

  const [isEnabled, setIsEnabled] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleSwitch = async () => {
    const newStatus = !isEnabled;
    setIsEnabled(newStatus);

    try {
        const response = await api.post('/postNotiDri', {
            id: order?.id,
            newStatus: newStatus ? 'เปิด' : 'ปิด' // เปลี่ยนข้อความตามที่คุณต้องการในฐานข้อมูล
        });
      //  console.log('API Response:', response.data); // Log ข้อมูลจาก API
    } catch (error) {
        console.error('API Error:', error.toJSON());
        Alert.alert('ข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
};

  const [imgS1, setImgS1] = useState(null);
  const [imgS2, setImgS2] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ตรวจสอบว่ามี id หรือไม่ก่อนที่จะดึงข้อมูล
    if (!id) return;
  //  console.log('id-->', id)
    // ฟังก์ชัน async ที่จะเรียก API
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/getOrderByIDDri/${id}`); // เรียก API เพื่อดึง order ข้อมูลผู้ใช้
        const orderData = response.data.order;
      //  console.log('data-->', orderData?.status_dri)
        setData(orderData); // ตั้งค่า order ที่ได้รับจาก API
        setImgS1(response?.data?.img);
        setImgS2(response?.data?.img2);
        setIsEnabled(orderData?.status_dri === 1); 
        // อัพเดทตำแหน่งต้นทางและปลายทาง
        setOrigin({
          latitude: parseFloat(orderData.latitude),
          longitude: parseFloat(orderData.longitude),
        });
        setDestination({
          latitude: parseFloat(orderData.latitude2),
          longitude: parseFloat(orderData.longitude2),
        });
        setCarTack({
          latitude: parseFloat(orderData.d_lat),
          longitude: parseFloat(orderData.d_long),
        });
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder(); // เรียกฟังก์ชันดึงข้อมูลเมื่อ id เปลี่ยนแปลง
  }, [id]); // Depend on id to refetch when it changes

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  // ใช้ useEffect เพื่อดูการเปลี่ยนแปลงของ isMapVisible
  useEffect(() => {
    const timer = setTimeout(() => setIsMapVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePress = async () => {
    if (order?.phone_re) {
      const url = `tel:${order?.phone_re}`;
      try {
        await Linking.openURL(url);
      } catch (error) {
        Alert.alert('Error', 'Unable to make a phone call');
        console.error('Error:', error);
      }
    } else {
      Alert.alert('Error', 'Phone number is not provided');
    }
  };


  const handleCancel = async () => {
    setLoading(true);
    if (!id) return;
  //  console.log('id-->', id)

    try {

      const formData = new FormData();
      formData.append('id', id);
    //  console.log('formData data ', formData)

      const response = await api.post('/postCancelDanger', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      console.log('--->postCancelDanger ', response.data)
      if (response.data.msgStatus === 200) {

        const orderData = response.data.order;
        setData(orderData); // ตั้งค่า order ที่ได้รับจาก API

      } else {
        Alert.alert('ข้อผิดพลาด', 'ไม่สามารถปิดงานได้');
      }

    } catch (error) {
     // console.error('API Error:', error.toJSON()); // Log detailed error info
      Alert.alert('ข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('id', id);

    //  console.log('Sending FormData:', formData);

      const response = await api.post('/postStatusDri', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
   //   console.log('API Response:', response.data);

      if (response.data.success === true) {
        router.push('(order)/success');
      } else {
        Alert.alert('ข้อผิดพลาด', response?.data?.message);
      }
    } catch (error) {
      console.error('API Error:', error.toJSON()); // Log detailed error info
      Alert.alert('ข้อผิดพลาด', error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };



  const renderOrderStatusButtons = (order) => {
    if (order?.order_status === 3) {
      return (
        <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{ marginTop: 15 }}
            onPress={() => {
              router.push({
                pathname: '(order)/danger',
                params: {
                  id: order?.id,
                  textHead: t('detail.Report'),
                  myStep: 1,
                },
              });
            }}
          >
            <View style={styles.btnDanger}>
              <Text style={styles.btnText}>{t('detail.Report')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleCancel} disabled={loading} style={{ marginTop: 15 }} >
            <View style={styles.btnDangerCan}>
              <Text style={styles.btnText}>{loading ?  `${t('detail.Canceling')}...` : `${t('detail.CancelNotification')}` } </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else if (order?.order_status === 1) {
      return (
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => {
            router.push({
              pathname: '(order)/danger',
              params: {
                id: order?.id,
                textHead: t('detail.Report'),
                myStep: 1,
              },
            });
          }}
        >
          <View style={styles.btnDanger}>
            <Text style={styles.btnText}>{t('detail.Report')}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return null; // Optional: Handle if no order_status matches
    }
  };


  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#f5f5f5' }} >
      
      <StatusBar style="dark" />

      <View style={styles.backButtonContainer}>
              
              <TouchableOpacity style={styles.btnBack} onPress={() => router.push('/(tabs)')}>
                                <View
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 1)',
                                        padding: 5,
                                        borderRadius: 25
                                    }}
                                >
                                    <Ionicons name="chevron-back" size={20} color="black" />
                                </View>
                            </TouchableOpacity>
            </View>

      <ScrollView>

       

        {destination && (
          <View>

{isMapVisible && destination && (
            <MapView
              initialRegion={{
                latitude: 13.7758339,
                longitude: 100.7054306,
                latitudeDelta: 0.4222,
                longitudeDelta: 0.4221,
              }}
              style={styles.map} >
              {carTack && (
                <>
                  <MapViewDirections
                    origin={carTack}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    mode='DRIVING'
                    language='th'
                  />
                  <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    mode='DRIVING'
                    language='th'
                  />
                  <Marker
                    coordinate={destination}
                    title="Starting Point"
                  />
                  <Marker
                    coordinate={carTack}
                    title="Destination Point"
                  >
                    <Image source={require('../../assets/images/truck.png')} style={{ height: 35, width: 35 }} />
                  </Marker>
                </>
              )}


            </MapView>
)}

          </View>
        )}



        <View style={styles.container}>

          <View style={styles.boxItemList}>

            <View style={styles.containerOrderMain}>
              <View style={styles.containerOrder}>
                <View >
                  <Image source={require('../../assets/images/box1.png')}
                    style={{ width: 40, height: 40, gap: 10, marginRight: 8 }} />
                </View>
                <View >
                  <Text style={{ fontWeight: 700, fontSize: 16 }}>#{order?.code_order}</Text>
                  <Text style={{ fontFamily: 'Prompt_400Regular', fontSize: 12, color: '#666', marginTop: 0 }}>{order?.dri_time}</Text>
                </View>
              </View>
              <DeviveryStatus order={order} />
            </View>

            {/* profileMain  */}
            {/* <View style={styles.profileMain}>
              <View style={styles.profile}>
                <Image
                  style={styles.userImage}
                  source={ require('../../assets/images/images.png') } />
                <View>
                  <Text style={{ fontFamily: 'Prompt_400Regular', fontSize: 13, color: '#666' }}>สินค้าต้นทาง,</Text>
                  <Text style={{ fontFamily: 'Prompt_500Medium', fontSize: 15, marginTop: -3 }}>{order?.name_re} </Text>
                  <Text style={{ fontFamily: 'Prompt_500Medium', fontSize: 14, marginTop: -3 }}>{order?.phone_re} </Text>

                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Feather style={{ borderWidth: 1, borderRadius: 20, padding: 10, borderColor: '#f47524' }} onPress={handlePress} name="phone" size={20} color="#f47524" />
              </View>
            </View> */}
            {/* profileMain  */}


            <View style={styles.textBoxDetail}>
              <View style={styles.flexItem}>
                <Text style={{ fontFamily: 'Prompt_400Regular', fontSize: 12, color: '#666' }}>{t('home.origin')} </Text>
                <Text style={{ fontWeight: 700, fontSize: 13 }}>TIP 9 Industrial Project </Text>
                <Text style={{ fontWeight: 700, fontSize: 13 }}>ถ.สุขุมวิท บางปูใหม่ เมืองสมุทรปราการ สมุทรปราการ 10280</Text>
              </View>
            </View>
            <View style={styles.line_bot}></View>
            {/* profileMain  */}
            <View style={styles.profileMain}>
              <View style={styles.profile}>
                <Image
                  style={styles.userImage}
                  source={{ uri: 'https://wpnrayong.com/admin/assets/media/avatars/300-12.jpg' }} />
                <View>
                  <Text style={{ fontFamily: 'Prompt_400Regular', fontSize: 13, color: '#666' }}>{t('detail.receive')},</Text>
                  <Text style={{ fontFamily: 'Prompt_500Medium', fontSize: 15, marginTop: -3 }}>{order?.name_re} </Text>
                  <Text style={{ fontFamily: 'Prompt_500Medium', fontSize: 14, marginTop: -3 }}>{order?.phone_re} </Text>

                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Feather style={{ borderWidth: 1, borderRadius: 20, padding: 10, borderColor: '#f47524' }} onPress={handlePress} name="phone" size={20} color="#f47524" />
              </View>
            </View>
            {/* profileMain  */}

            <View style={styles.textBoxDetail}>
              <View style={styles.flexItem}>
                <Text style={{ fontFamily: 'Prompt_400Regular', fontSize: 12, color: '#666' }}>{t('home.destination')}</Text>
                <Text style={{ fontWeight: 700, fontSize: 13 }}>{order?.name_re}</Text>
                <Text style={{ fontWeight: 700, fontSize: 13 }}>{order?.adddress_re} {order?.province2}</Text>
              </View>
            </View>

          </View>

          <Text style={styles.sectionTitle}>{t('detail.loadProduct')}</Text>
          <View style={styles.boxItemList2}>

            <View style={styles.showflexCamera}>

              {order?.order_status == 1 && (

                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: '(order)/addPic',
                      params: {
                        id: order?.id,
                        textHead: t('detail.loadProduct'),
                        myStep: 1
                      }, // Pass the order id as a parameter
                    });
                  }}>
                  <Ionicons name="camera-outline" style={styles.camera} size={100} color="black" />
                </TouchableOpacity>

              )}


              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {imgS1 && (
                  <>
                    {imgS1.map((img, index) => (
                      <Image key={index} source={{ uri: img.image }} style={styles.ImgFrist} />
                    ))}
                  </>
                )}
              </ScrollView>

            </View>
            <View style={styles.dottedBorder}></View>
            <View style={styles.showflex}>
              <Text style={styles.remarkh}> {t('detail.remark')} : </Text>
              <Text style={styles.remarkx}>{order?.remark_dri1}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t('detail.delivery')}</Text>
          <View style={styles.boxItemList2}>
            <View style={styles.textListHead2}>
              <View style={styles.profile}>
                <View>
                  <Ionicons name="notifications-outline" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.textSeting}>{t('detail.Inform')}</Text>
                </View>
              </View>
              <View>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>{t('detail.successfulDelivery')}</Text>
          <View style={styles.boxItemList2}>
            <View style={styles.showflexCamera}>
              {order?.order_status == 1 && (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: '(order)/addPic',
                      params: {
                        id: order?.id,
                        textHead: t('detail.successfulDelivery'),
                        myStep: 2
                      }, // Pass the order id as a parameter
                    });
                  }}>
                  <Ionicons name="camera-outline" style={styles.camera} size={100} color="black" />
                </TouchableOpacity>
              )}

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              >
                {imgS2 && (
                  <>
                    {imgS2.map((img, index) => (
                      <Image key={index} source={{ uri: img.image }} style={styles.ImgFrist} />
                    ))}
                  </>
                )}
              </ScrollView>
            </View>
            <View style={styles.dottedBorder}></View>
            <View style={styles.showflex}>
              <Text style={styles.remarkh}> {t('detail.remark')} : </Text>
              <Text style={styles.remarkx}>{order?.remark_dri2}</Text>
            </View>
          </View>




          {order?.order_status == 1 && (
            <View>
              <TouchableOpacity
                onPress={handleCreate} disabled={loading}
              >
                <View style={styles.btn}>
                  <Text style={styles.btnText}>{loading ?  `${t('detail.being')}...` : `${t('detail.being2')}` }</Text>
                </View>
              </TouchableOpacity>

            </View>
          )}

          <View>
            {renderOrderStatusButtons(order)}
          </View>

          {/* {(order?.order_status === 3) ? (
  <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
  <TouchableOpacity
  style={{ marginTop: 15 }}
    onPress={() => {
      router.push({
        pathname: '(order)/danger',
        params: {
          id: order?.id,
          textHead: 'แจ้งอุบัติเหตุ',
          myStep: 1,
        },
      });
    }}
  >
    <View style={styles.btnDanger}>
      <Text style={styles.btnText}>แจ้งอุบัติเหตุ</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity
  style={{ marginTop: 15 }}
    onPress={() => {
    }}
  >
    <View style={styles.btnDangerCan}>
      <Text style={styles.btnText}>ยกเลิกแจ้งเหตุ</Text>
    </View>
  </TouchableOpacity>
  </View>
) : (
<TouchableOpacity
  style={{ marginTop: 15 }}
    onPress={() => {
      router.push({
        pathname: '(order)/danger',
        params: {
          id: order?.id,
          textHead: 'แจ้งอุบัติเหตุ',
          myStep: 1,
        },
      });
    }}
  >
    <View style={styles.btnDanger}>
      <Text style={styles.btnText}>แจ้งอุบัติเหตุ</Text>
    </View>
  </TouchableOpacity>
)} */}


        </View>
      </ScrollView>

    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBack: {
    backgroundColor: 'rgba(0, 19, 255, 0.2)',
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
  },
  textListHead2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  textSeting: {
    fontSize: 16,
    fontFamily: 'Prompt_400Regular'
  },
  scrollContainer: {
    marginTop: 0
  },
  backIcon: {
    backgroundColor: 'rgba(50, 209, 145, 0.2)',
    padding: 3,
    borderRadius: 50,
  },
  dottedBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'dotted',
  },
  ImgFrist: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'Prompt_500Medium',
    marginBottom: 8,
    marginTop: 15
  },
  remarkh: {
    fontSize: 14,
    fontFamily: 'Prompt_500Medium',
    width: '20%',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  remarkx: {
    fontSize: 14,
    fontFamily: 'Prompt_400Regular',
    color: '#999',
    width: '80%',
    textAlignVertical: 'center'
  },
  camera: {
    borderWidth: 0.5, // Specifies the width of the bottom border
    borderColor: '#000',
    borderRadius: 10
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  textBoxDetail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  showflexCamera: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 10
  },
  showflexCameraCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    padding: 10
  },
  flexItem: {

  },
  line_bot: {
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 0.3,
    paddingBottom: 5,

  },
  flexItem2: {
    alignItems: 'flex-end'
  },
  profileMain: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5, // Specifies the width of the bottom border
    borderBottomColor: '#d7d7d7',
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  showflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 5
  },
  textListHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: 'Prompt_400Regular',
  },
  listItemCon: {
    paddingTop: Platform.select({
      ios: 35,
      android: 35,
    }),
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
  map: {
    width: '100%',
    height: 300,
  },
  containerOrder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingTop: 2
  },
  containerOrderMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5, // Specifies the width of the bottom border
    borderBottomColor: '#d7d7d7',
    paddingBottom: 5
  },
  textStatus: {
    backgroundColor: '#f47524',
    width: 100,
    borderRadius: 99,
    padding: 5,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  boxItemList: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginTop: 12,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow (elevation)
    elevation: 0.8,
  },
  boxItemList2: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginTop: 0,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow (elevation)
    elevation: 0.8,
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
    marginBottom: 10
  },
  btnDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#f44336',
    borderColor: '#f44336',
    marginBottom: 30
  },
  btnDangerCan: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#17a2b8',
    borderColor: '#17a2b8',
    marginBottom: 30
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    color: '#fff',
    fontFamily: 'Prompt_500Medium',
  },
});