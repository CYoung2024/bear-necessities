import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CADETCODE_STORAGE_KEY = "@MyApp:CadetCode";
const CADETSTATUS_STORAGE_KEY = "@MyApp:CadetStatusKey";
const EXPOPUSHTOKEN_STORAGE_KEY = "@MyApp:ExpoPushTokenKey";

// const COMPANY_STORAGE_KEY = "@MyApp:CompanyKey";
// const YEAR_STORAGE_KEY = "@MyApp:YearKey";

const MyStorage = ({
  initialCadetCode,
  initialCadetStatus,
  initialExpoPushToken,
}) => {
  //, initialCompany, initialYear

  const [cadetCode, setCadetCode] = useState(initialCadetCode);
  const [cadetStatus, setCadetStatus] = useState(initialCadetStatus);
  const [expoPushToken, setExpoPushToken] = useState(initialExpoPushToken);

  // const [company, setCompany] = useState(initialCompany);
  // const [year, setYear] = useState(initialYear);

  const loadValues = async () => {
    try {
      const cadetCode = await AsyncStorage.getItem(CADETCODE_STORAGE_KEY);
      setCadetCode(cadetCode !== null ? cadetCode : initialCadetCode);

      const cadetStatus = await AsyncStorage.getItem(CADETSTATUS_STORAGE_KEY);
      setCadetStatus(cadetStatus !== null ? cadetStatus : initialCadetStatus);

      const expoPushToken = await AsyncStorage.getItem(
        EXPOPUSHTOKEN_STORAGE_KEY
      );
      setExpoPushToken(
        expoPushToken !== null ? expoPushToken : initialExpoPushToken
      );

      // const company = await AsyncStorage.getItem(COMPANY_STORAGE_KEY);
      // const year = await AsyncStorage.getItem(YEAR_STORAGE_KEY);
      // setCompany(company          !== null ? company      : initialCompany);
      // setYear(year                !== null ? year         : initialYear);
    } catch (e) {
      console.error("Failed to load values from AsyncStorage", e);
    }
  };

  useEffect(() => {
    loadValues();
  }, []);

  const saveCadetCode = async (newValue) => {
    try {
      await AsyncStorage.setItem(CADETCODE_STORAGE_KEY, newValue);
      setCadetCode(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveCadetStatus = async (newValue) => {
    try {
      await AsyncStorage.setItem(CADETSTATUS_STORAGE_KEY, newValue);
      setCadetStatus(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveExpoPushToken = async (newValue) => {
    try {
      await AsyncStorage.setItem(EXPOPUSHTOKEN_STORAGE_KEY, newValue);
      setExpoPushToken(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  // const saveCompany = async (newValue) => {
  //     try {
  //         await AsyncStorage.setItem(COMPANY_STORAGE_KEY, newValue);
  //         setCompany(newValue);
  //     } catch (e) {
  //         console.error("Failed to save string value to AsyncStorage", e);
  //     }
  // };

  // const saveYear = async (newValue) => {
  //     try {
  //         await AsyncStorage.setItem(YEAR_STORAGE_KEY, newValue);
  //         setYear(newValue);
  //     } catch (e) {
  //         console.error("Failed to save string value to AsyncStorage", e);
  //     }
  // };

  return {
    cadetCode,
    saveCadetCode,
    // company,
    // saveCompany,
    // year,
    // saveYear,
    cadetStatus,
    saveCadetStatus,
    loadValues,
    expoPushToken,
    saveExpoPushToken,
  };
};

export default MyStorage;
