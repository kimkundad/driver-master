import React, { useEffect, useContext, useState } from 'react';
import { Image, Text, View, StyleSheet, Alert, FlatList, TouchableOpacity, ActivityIndicator, Keyboard, TouchableWithoutFeedback, TextInput, ImageBackground, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { UserContext } from '../../hooks/UserContext';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import api from '../../hooks/api'; // Axios instance
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import DeviveryStatus from '../../components/DeviveryStatus';


const LOCATION_TASK_NAME = 'background-location-task';

// Define the background task for location updates
if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
  TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
      console.error('Background location error:', error);
      return;
    }

    if (data) {

      console.log('Task locations');
      const { locations } = data;
      const { latitude, longitude } = locations[0].coords;
      console.log('Background location:', latitude, longitude);

      // Send the location to your API
      await sendLocationToApi(latitude, longitude);
    }
  });
  console.log('Task defined successfully');
} else {
  console.log('Task already defined');
}


// Function to send location to the API
const sendLocationToApi = async (latitude, longitude) => {
  const form = {
    latitude,
    longitude,
  };
  console.log('form', form);
  try {
    const response = await api.post('/myLocation', form);
    console.log('response', response.data);
    if (response.status === 200) {
      Alert.alert('สำเร็จ', 'ส่งพิกัดไปยัง api แล้ว');
    } else {
      Alert.alert('ข้อผิดพลาด', 'ไม่สามารถส่งพิกัดไปยัง api ได้');
    }
  } catch (error) {
    Alert.alert('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการส่งพิกัด');
    console.error('Error sending location:', error);
  }
};


export default function HomeScreen({ navigation }) {
  const { userProfile } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const startBackgroundLocationTracking = async () => {
      // Request foreground permission first
      const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
      if (foregroundStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location in the foreground was denied');
        return;
      }
      console.log('Foreground permission granted');

      // Request background permission
      const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
      console.log('Background permission status:', backgroundStatus);
      if (backgroundStatus !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location in the background was denied');
        return;
      }
      console.log('Background permission granted');

      // Start background location updates
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        distanceInterval: 40,
        foregroundService: {
          notificationTitle: 'Location Tracking Active',
          notificationBody: 'We are tracking your location in the background',
        },
      });
      console.log('Background location tracking started');
    };

    // Check platform and start tracking location
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      startBackgroundLocationTracking();
    }

    // Stop tracking when the component unmounts
    return () => {
      if (TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
        Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME)
          .then(() => console.log('Background location updates stopped'))
          .catch((error) => console.error('Error stopping background location updates:', error));
      } else {
        console.log('Task not found, cannot stop location updates');
      }
    };
  }, []);


  

  // Fetch data initially
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/getOrderDri');
        setData(response.data?.order || []);
        setFilteredData(response.data?.order || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = data.filter((item) =>
      item.code_order.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <SafeAreaProvider style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaProvider>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }}>

<Stack.Screen options={{
                    headerTransparent: true,
                    headerTitle: 'Loadmaster',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: '#000', // กำหนดสีของ headerTitle
                        fontFamily: 'Prompt_500Medium', // กำหนดฟอนต์
                        fontSize: 18,
                    },
                    // headerRight: () => (
                    //     <TouchableOpacity style={styles.btnBack} >
                    //         <View
                    //             style={{
                    //                 backgroundColor: '#fff',
                    //                 padding: 6,
                    //                 borderRadius: 10
                    //             }}
                    //         >
                    //             <Ionicons name="notifications-outline" size={22} color="black" />
                    //         </View>
                    //     </TouchableOpacity>
                    // )
                }} />

      <View style={styles.container}>


           {/* Receipt Input Field */}
           <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Enter the receipt number" 
                    style={styles.input} 
                    value={searchInput}
                    onChangeText={handleSearch}
                  />
                  <Feather style={styles.searchIcon} name="search" size={24} color="gray" />
            </View>

            {/* Current Shipments Section */}
            <Text style={styles.sectionTitle}>Current Shipments</Text>


            <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id}
              onPress={() => {
                // Use router.push to navigate to the "(branch)/shop" route with the "id" param
                router.push({
                  pathname: '(order)/detail',
                  params: { id: item.id }, // Pass the branch id as a parameter
                });
              }}
              >
            <View style={styles.shipmentCard}>
                {/* Shipment Number */}
                <View style={styles.shipmentHeader}>
                  <View style={styles.headOrderCode}>
                    <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>

                      <View>
                      <DeviveryStatus order={item} />
                      </View>
                      <Text style={styles.shipmentNumber}>{item.dri_date}</Text>
                      
                    </View>
                    <Text style={styles.shipmentId}>{item.code_order}</Text>
                  </View>
                    <Image 
                        source={require('../../assets/images/shipping.png')}
                        style={styles.shipmentIcon} 
                    />
                </View>
                {/* Shipment Details */}
                <View style={styles.shipmentDetails}>
                    {/* Sender */}
                    <View style={styles.flexItem}>

                      <View>
                        <Text style={styles.HeadshipmentInfo}>ต้นทาง</Text>
                        <View style={styles.shipmentRow}>
                            <Ionicons name="cube-outline" size={20} color="#3858b1" />
                            <Text style={styles.shipmentInfo}>{item.province}</Text>
                        </View>
                      </View>

                      {/* Receiver */}
                      <View>
                        <Text style={styles.HeadshipmentInfo}>จำนวน</Text>
                        <View style={styles.shipmentRow}>
                            <FontAwesome5 name="cubes" size={20} color="#3858b1" />
                            <Text style={styles.shipmentInfo}>{item.amount} กล่อง</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.flexItem}>
                      <View>
                        <Text style={styles.HeadshipmentInfo}>ปลายทาง</Text>
                        <View style={styles.shipmentRow}>
                            <MaterialCommunityIcons name="cube-scan" size={22} color="#3858b1" />
                            <Text style={styles.shipmentInfo}>{item.province2}</Text>
                        </View>
                      </View>
                      {/* Receiver */}
                      <View>
                        <Text style={styles.HeadshipmentInfo}>ประเภท</Text>
                        <View style={styles.shipmentRow}>
                            <MaterialCommunityIcons name="alert-octagram-outline" size={20} color="#3858b1" />
                            <Text style={styles.shipmentInfo}>{item.type}</Text>
                        </View>
                      </View>

                    </View>
                </View>
            </View>
            </TouchableOpacity>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No orders found</Text>}
          />



        </View>
    </SafeAreaProvider>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  textListHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchBar: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  btnBack: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
    marginRight: 7
},
searchIcon: {
  padding: 0,
},
inputContainer: {
  marginTop: 5,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 50,
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginBottom: 20,
  borderWidth: 0.5,
  borderColor: '#999',
},
input: {
  flex: 1,
  fontSize: 14,
  color: '#6b6b6b',
},
  showflex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  profileMain: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  flexItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headOrderCode: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    paddingHorizontal: 15,
    marginTop: Platform.select({
      ios: 80,
      android: 75,
  }),

  },
  addShipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
},
addShipmentText: {
    fontSize: 16,
    color: '#6b6b6b',
    marginLeft: 5,
},
sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
},
shipmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
},
shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBlockColor: '#d7dbdf'
},
shipmentNumber: {
    fontSize: 14,
    color: '#6b6b6b',
    textAlignVertical: 'center'
},
shipmentId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5
},
shipmentIcon: {
    width: 55,
    height: 55,
    marginTop: -12,
    resizeMode: 'contain',
},
shipmentDetails: {
    marginTop: 0,
},
shipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
HeadshipmentInfo: {
  fontSize: 14,
  color: '#889096',
  fontFamily: 'Prompt_500Medium',
},
shipmentInfo: {
    fontSize: 13,
    color: '#000',
    marginLeft: 8,
    fontFamily: 'Prompt_500Medium',
},
});