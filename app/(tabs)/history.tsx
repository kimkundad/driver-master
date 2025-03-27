import React, { useEffect, useContext, useState } from 'react';
import { Image, Text, View, RefreshControl, StyleSheet, Platform, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useNavigation, router, Stack } from 'expo-router';
import api from '../../hooks/api'; // Axios instance
import { Feather, Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import DeviveryStatus from '../../components/DeviveryStatus';
import { useTranslation } from "react-i18next";

export default function History() {

  const [data, setData] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const [filteredData, setFilteredData] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Track refresh state
  const { i18n, t } = useTranslation(); // ใช้ i18n สำหรับการจัดการภาษา


  const renderItem = ({ item: orders }) => (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '(order)/detail',
          params: { 
            id: orders.id,
            xlatitude: orders.latitude,
            xlongitude: orders.longitude,
            xlatitude2: orders.latitude2,
            xlongitude2: orders.longitude2,
            xd_lat: orders.d_lat,
            xd_long: orders.d_long,
          }, // Pass the order id as a parameter
        });
      }}
    >
      <View style={styles.shipmentCard}>
        {/* Shipment Number */}
        <View style={styles.shipmentHeader}>
          <View style={styles.headOrderCode}>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
  
              <View>
                <DeviveryStatus order={orders} />
              </View>
              <Text style={styles.shipmentNumber}>{orders?.dri_date}</Text>
  
            </View>
            <Text style={styles.shipmentId}>{orders?.code_order}</Text>
          </View>
          <Image
            source={require('../../assets/images/shipping.png')}
            style={styles.shipmentIcon}
          />
        </View>
        {/* Shipment Details */}
        <View style={styles.shipmentDetails}>
          <View style={styles.flexItem}>
            <View>
              <Text style={styles.HeadshipmentInfo}>{t('home.origin')}</Text>
              <View style={styles.shipmentRow}>
                <Ionicons name="cube-outline" size={20} color="#3858b1" />
                <Text style={styles.shipmentInfo}>{orders?.province}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.HeadshipmentInfo}>{t('home.quantity')}</Text>
              <View style={styles.shipmentRow}>
                <FontAwesome5 name="cubes" size={20} color="#3858b1" />
                <Text style={styles.shipmentInfo}>{orders?.amount} {t('history.box')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.flexItem}>
            <View>
              <Text style={styles.HeadshipmentInfo}>{t('home.destination')}</Text>
              <View style={styles.shipmentRow}>
                <MaterialCommunityIcons name="cube-scan" size={22} color="#3858b1" />
                <Text style={styles.shipmentInfo}>{orders?.province2}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.HeadshipmentInfo}>{t('home.type')}</Text>
              <View style={styles.shipmentRow}>
                <MaterialCommunityIcons name="alert-octagram-outline" size={20} color="#3858b1" />
                <Text style={styles.shipmentInfo}>{orders?.type}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/getHistory');
      console.log('response', response.data)
      setData(response.data?.order || []);
      setFilteredData(response.data?.order || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (text) => {
    setSearchInput(text);
    const filtered = data.filter((item) =>
      item.code_order.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Refresh the FlatList data
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(); // Fetch data again to refresh
    setRefreshing(false);
  };

  if (loading) {
    return (
      <SafeAreaProvider style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: () => (
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Prompt_500Medium',
              fontSize: 18,
              textAlign: 'center',
            }}
          >
            {t('history.history')}
          </Text>
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#fff', // กำหนดสีของ headerTitle
          fontFamily: 'Prompt_500Medium', // กำหนดฟอนต์
          fontSize: 18,
        },
      }} />

<View style={styles.orangeBackground}>
      
      <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Enter the receipt number" 
                    style={styles.input} 
                    value={searchInput}
                    onChangeText={handleSearch}
                  />
                  <Feather style={styles.searchIcon} name="search" size={24} color="gray" />
            </View>
            
            </View>
            
            
      <View style={styles.container}>
        <FlatList
        
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Ensure id is a string
          ListEmptyComponent={
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <Text style={styles.emptyText}>No orders found</Text>
            )
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  orangeBackground: {
    backgroundColor: '#121f43', // Adjust to match the exact orange color you want
    padding: 20, // Adjust this to control height of orange section
    paddingBottom: 1,
    paddingTop: Platform.select({
      ios: 80,
      android: 75,
  }),
},
inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 50,
  borderWidth: 1,
  borderColor: '#ddd',
  paddingHorizontal: 15,
  marginVertical: 5,
  marginBottom: 20,
},
input: {
  flex: 1,
  height: 55, // Set the desired height here
  fontSize: 14,
  paddingVertical: 10, // Optional: adjusts vertical padding for better text alignment
},
  headOrderCode: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 15
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
  flexItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  shipmentCard: {
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#999',
    marginBottom: 15,
    padding: 15,
    paddingBottom: 5,
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  section: {
    marginTop: 10,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
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
  orderTypeDurationWrapper: {
    backgroundColor: '#fff', // Background color for duration
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
    width: 230
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
    fontFamily: 'Prompt_500Medium',
    color: '#888',
  },
  orderTypePrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchIcon: {
    padding: 0,
  },
  
  TextInput: {
    padding: 7,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    width: '87%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: '#666',
    borderRightColor: '#666',
    borderLeftColor: '#fff',
    borderWidth: 1,
  },
  searchBar: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  iconScan: {
    backgroundColor: '#fff',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    overflow: 'hidden',
    borderTopColor: '#666',
    borderRightColor: '#000',
    borderLeftColor: '#666',
    borderWidth: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    gap: 10,
    borderRadius: 99,
  },
  header: {
    padding: 10,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30
  },
  showflex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  showflex2: {
    display: 'flex',
    flexDirection: 'row',
  },
  textListHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    paddingHorizontal: 15,
  },
  boxlist: {
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    padding: 10,
    marginHorizontal: 10,
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconright: {
    justifyContent: 'center'
  }
});