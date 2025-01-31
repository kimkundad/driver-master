import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import translationEn from "./locales/en-US/translation.json";
import translationZh from "./locales/zh-CN/translation.json";
import translationTh from "./locales/th-TH/translation.json";

// Configuração das traduções
const resources = {
    "en-US": { translation: translationEn },
    "zh-CN": { translation: translationZh },
    "th-TH": { translation: translationTh },
  };


  const initI18n = async () => {
    let savedLanguage = await AsyncStorage.getItem("language");
  
    if (!savedLanguage) {
      savedLanguage = Localization.locale;
    }
  
    i18n.use(initReactI18next).init({
      compatibilityJSON: "v3",
      resources,
      lng: savedLanguage,
      fallbackLng: "th-TH",
      interpolation: {
        escapeValue: false,
      },
    });
  
    // Configura a direção do texto (LTR ou RTL)
    // I18nManager.allowRTL(false);
    // I18nManager.forceRTL(Localization.isRTL);
  };
  
  initI18n();
  
  export default i18n;