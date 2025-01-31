import { Image, View, Text, StyleSheet, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Language = () => {
  const { i18n, t } = useTranslation(); // ใช้ i18n สำหรับการจัดการภาษา
  const [checked, setChecked] = useState("");
  const currentLanguage = i18n.language;

  useEffect(() => {
    // โหลดภาษาที่เคยบันทึกไว้ใน AsyncStorage
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        setChecked(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang) => {
    await AsyncStorage.setItem("language", lang); // บันทึกภาษาที่เลือกใน AsyncStorage
    i18n.changeLanguage(lang); // เปลี่ยนภาษา
    setChecked(lang); // อัปเดตสถานะที่เลือก
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar style="dark" />
      <ScrollView>
        <View style={styles.listItemCon}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <Link href="/(tabs)/profile" style={{ padding: 10 }}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </Link>
            <View style={styles.textListHead}>
              <Text style={{ fontSize: 18, fontFamily: "Prompt_500Medium" }}>{t("language")}</Text>
            </View>
            <View>
              <Ionicons style={{ padding: 10 }} name="notifications-outline" size={27} color="black" />
            </View>
          </View>
        </View>

        <View style={{ paddingBottom: 10, paddingTop: 10 }}>
          <View style={styles.card}>
            <View style={styles.line_bot}></View>

            {/* ภาษาอังกฤษ */}
            <TouchableOpacity
              style={styles.LItem}
              onPress={() => changeLanguage("en-US")}
            >
              <View style={styles.showflex}>
                <Text style={styles.TextName}>English (US)</Text>
                <View style={[styles.radioButton, checked === "en-US" && styles.radioButtonInner]} />
              </View>
            </TouchableOpacity>

            {/* ภาษาจีน */}
            <TouchableOpacity
              style={styles.LItem}
              onPress={() => changeLanguage("zh-CN")}
            >
              <View style={styles.showflex}>
                <Text>中文 (自动翻译)</Text>
                <View style={[styles.radioButton, checked === "zh-CN" && styles.radioButtonInner]} />
              </View>
            </TouchableOpacity>

            {/* ภาษาไทย */}
            <TouchableOpacity
              style={styles.LItem}
              onPress={() => changeLanguage("th-TH")}
            >
              <View style={styles.showflex}>
                <Text>ภาษาไทย (TH)</Text>
                <View style={[styles.radioButton, checked === "th-TH" && styles.radioButtonInner]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  showflex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  LItem: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  line_bot: {
    borderBottomColor: "#bfbfbf",
    borderBottomWidth: 0.3,
    paddingBottom: 5,
    marginBottom: 10,
  },
  listItemCon: {
    paddingTop: 40,
    paddingHorizontal: 0,
    backgroundColor: "#fff",
  },
  card: {
    paddingTop: 0,
    position: "static",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    padding: 10,
  },
  textListHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    fontFamily: "Prompt_400Regular",
  },
  TextName: {
    fontFamily: "Prompt_400Regular",
    fontSize: 16
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#121F43",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInner: {
    backgroundColor: "#121F43",
    height: 14,
    width: 14,
    borderRadius: 7,
  },
});
