import { Image, Text, View, StyleSheet, Switch, Platform, ScrollView, TouchableOpacity, TextInput , Dimensions} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Link, useNavigation, router, Stack } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const { width } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../hooks/UserContext';

export default function Profile() {

  const { logout }  = useContext(UserContext);
  const { userProfile }  = useContext(UserContext);

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#fff' }} >
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: 'Profile',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          color: '#000', // กำหนดสีของ headerTitle
          fontFamily: 'Prompt_500Medium', // กำหนดฟอนต์
          fontSize: 18,
        },
      }} />
      <ScrollView>


                <View style={styles.container}>

                  <View style={styles.bodyContainer}>


                  <View style={{ alignItems: 'center', paddingTop: 15 }}>
              <Image
                style={styles.userImageCenter}
                source={{ uri: 'https://wpnrayong.com/admin/assets/media/avatars/300-12.jpg' }} />
              <View style={{ alignItems: 'center' }}>
                <Text style={{
                  color: '#000', fontSize: 18, fontFamily: 'Prompt_500Medium',
                }}>{userProfile?.name}</Text>
                <View style={styles.showflex}>
                  <Text style={{
                    color: '#000', fontSize: 14, fontFamily: 'Prompt_500Medium', fontWeight: 700, marginRight: 5
                  }}>รหัส</Text>
                  <Text style={{
                    color: '#000', fontSize: 14, fontFamily: 'Prompt_400Regular',
                  }}>{userProfile?.code_user}</Text>
                </View>
              </View>
            </View>

            <View style={styles.line_bot}></View>

                  
                   {/* Menu Setting */}
            <View style={{ marginTop: 8 }}>

<TouchableOpacity
  onPress={() => {
    // handle onPress
    router.push('(setting)');
  }}>
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <AntDesign name="user" size={20} color="black" />
      </View>
      <View>
        <Text style={styles.textSeting}>Edit Profile</Text>
      </View>
    </View>
    <View>
      <Feather name="chevron-right" size={24} color="black" />
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    // handle onPress
    router.push('(setting)/language');
  }}>
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <Entypo name="language" size={20} color="black" />
      </View>
      <View>
        <Text style={styles.textSeting}>Language</Text>
      </View>
    </View>

    <View>
      <View style={styles.showflex}>
        <View style={{ marginRight: 10 }}>
          <Text style={styles.textSeting2}>ภาษาไทย (TH)</Text>
        </View>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
    </View>
  </View>
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    // handle onPress
    router.push('(setting)/helpcen');
  }}>
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <Feather name="phone" size={20} color="black" />
      </View>
      <View>
        <Text style={styles.textSeting}>Help Center</Text>
      </View>
    </View>
    <View>
      <Feather name="chevron-right" size={24} color="black" />
    </View>
  </View>
</TouchableOpacity>
<View >
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      <View>
        <Text style={styles.textSeting}>Notification</Text>
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
<View >
  <TouchableOpacity
    onPress={() => {
      // handle onPress
      router.push('(setting)/policy');
    }}>
    <View style={styles.textListHead2}>
      <View style={styles.profile}>
        <View>
          <MaterialIcons name="lock-outline" size={20} color="black" />
        </View>
        <View>
          <Text style={styles.textSeting}>privacy policy</Text>
        </View>
      </View>
      <View>
        <Feather name="chevron-right" size={24} color="black" />
      </View>
    </View>
  </TouchableOpacity>
</View>

<TouchableOpacity
  onPress={() => {
    // handle onPress
    router.push('(setting)/about');
  }}>
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <Feather name="info" size={20} color="black" />
      </View>
      <View>
        <Text style={styles.textSeting}>About Us</Text>
      </View>
    </View>
    <View>
      <Feather name="chevron-right" size={24} color="black" />
    </View>
  </View>
</TouchableOpacity>
<TouchableOpacity
  onPress={handleLogout}
  >
  <View style={styles.textListHead2}>
    <View style={styles.profile}>
      <View>
        <AntDesign name="logout" size={20} color="#dc3545" />
      </View>
      <View>
        <Text style={styles.textSeting3}>Logout</Text>
      </View>
    </View>
    <View>
      <Feather name="chevron-right" size={24} color="#dc3545" />
    </View>
  </View>
</TouchableOpacity>

</View>
{/* Menu Setting */}
                    
                  </View>
                </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  listItemCon: {
    paddingTop: 40,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    textAlign: 'center'
    
},
showflex: {
    display: 'flex',
    flexDirection: 'row',
  },
  userImageCenter: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
textSeting: {
    fontSize: 16,
    fontFamily: 'Prompt_400Regular'
  },
  textSeting2: {
    fontSize: 15,
    fontFamily: 'Prompt_400Regular',
    color: '#3858b1'
  },
textListHead: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
  fontFamily: 'Prompt_400Regular',
},
textSeting3: {
    fontSize: 15,
    fontFamily: 'Prompt_400Regular',
    color: '#dc3545'

  },
  line_bot: {
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 0.3,
    paddingBottom: 20
  },
profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
textListHead2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingBottom: 12
  },
container: {
  padding: 10,
  paddingHorizontal: 12,
  marginTop: Platform.select({
    ios: 75,
    android: 65,
  }),
},
bodyContainer: {
  padding: 12,
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
  borderRadius: 35
},
});
