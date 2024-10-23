import { Image, View, Text, StyleSheet, Platform, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, useNavigation, router } from 'expo-router';
import Dropdown from "../../components/DropDown";

const CustomRadioButton = ({ label, value, status, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.radioButtonContainer}>
        <View style={styles.radioButton}>
          {status === 'checked' && <View style={styles.radioButtonInner} />}
        </View>
      </TouchableOpacity>
    );
  };

const Language = () => {

    const [checked, setChecked] = useState('first');

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
              <Text style={{ fontSize: 18, fontFamily: 'Prompt_500Medium' }}>Language</Text>
            </View>
            <View >
              <Ionicons style={{ padding: 10 }} name="notifications-outline" size={27} color="black" />
            </View>
          </View>
        </View>

        <View style={{ paddingBottom : 10, paddingTop: 10}}>
            
          <View style={styles.card}>
          <View style={styles.line_bot}></View>

            <View style={styles.LItem}>
                <View style={styles.showflex}>
                        <View>
                            <Text>English (US)</Text>
                        </View>
                        <View>
                        <CustomRadioButton
                            label="First"
                            value="first"
                            status={checked === 'first' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('first')}
                        />
                        </View>
                </View>
            </View>
            
            <View style={styles.LItem}>
                <View style={styles.showflex}>
                        <View>
                            <Text>中文 (自动翻译)</Text>
                        </View>
                        <View>
                        <CustomRadioButton
                            label="third"
                            value="third"
                            status={checked === 'third' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('third')}
                        />
                        </View>
                </View>
            </View>


            <View style={styles.LItem}>
                <View style={styles.showflex}>
                        <View>
                            <Text>ภาษาไทย (TH)</Text>
                        </View>
                        <View>
                        <CustomRadioButton
                            label="Second"
                            value="second"
                            status={checked === 'second' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('second')}
                        />
                        </View>
                </View>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default Language


const styles = StyleSheet.create({

  container: {
    padding: 20,
  },
  showflex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  LItem: {
    padding: 10,
    
  },
  line_bot: {
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 0.3,
    paddingBottom: 5,
    marginBottom: 10

  },
  listItemCon: {
    paddingTop: 40,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  card: {
    paddingTop: 0,
    position: 'static',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    padding: 10,

  },
  textListHead: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    fontFamily: 'Prompt_400Regular',
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#121F43',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#121F43',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
});