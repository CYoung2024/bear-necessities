// Holds tools for local storage

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const COMPANY_STORAGE_KEY = "@MyApp:companyKey";
const CADETLIST1C_STORAGE_KEY = "@MyApp:cadetList1cKey";
const CADETLIST2C_STORAGE_KEY = "@MyApp:cadetList2cKey";
const CADETLIST3C_STORAGE_KEY = "@MyApp:cadetList3cKey";
const CADETLIST4C_STORAGE_KEY = "@MyApp:cadetList4cKey";

const MyStorage = ({
  initialCompany,
  initialCadetList1c,
  initialCadetList2c,
  initialCadetList3c,
  initialCadetList4c,
}) => {
  const [company, setCompany] = useState(initialCompany);
  const [cadetList1c, setCadetList1c] = useState(initialCadetList1c);
  const [cadetList2c, setCadetList2c] = useState(initialCadetList2c);
  const [cadetList3c, setCadetList3c] = useState(initialCadetList3c);
  const [cadetList4c, setCadetList4c] = useState(initialCadetList4c);

  const loadValues = async () => {
    try {
      const storedCompany = await AsyncStorage.getItem(COMPANY_STORAGE_KEY);
      const storedCadetList1c = await AsyncStorage.getItem(
        CADETLIST1C_STORAGE_KEY
      );
      const storedCadetList2c = await AsyncStorage.getItem(
        CADETLIST2C_STORAGE_KEY
      );
      const storedCadetList3c = await AsyncStorage.getItem(
        CADETLIST3C_STORAGE_KEY
      );
      const storedCadetList4c = await AsyncStorage.getItem(
        CADETLIST4C_STORAGE_KEY
      );
      setCompany(storedCompany !== null ? storedCompany : initialCompany);
      setCadetList1c(
        storedCadetList1c !== null
          ? JSON.parse(storedCadetList1c)
          : initialCadetList1c
      );
      setCadetList2c(
        storedCadetList2c !== null
          ? JSON.parse(storedCadetList2c)
          : initialCadetList2c
      );
      setCadetList3c(
        storedCadetList3c !== null
          ? JSON.parse(storedCadetList3c)
          : initialCadetList3c
      );
      setCadetList4c(
        storedCadetList4c !== null
          ? JSON.parse(storedCadetList4c)
          : initialCadetList4c
      );
    } catch (e) {
      console.error("Failed to load values from AsyncStorage", e);
    }
  };

  useEffect(() => {
    loadValues();
  }, []);

  const saveCompany = async (newValue) => {
    try {
      await AsyncStorage.setItem(COMPANY_STORAGE_KEY, newValue);
      setCompany(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveCadetList1c = async (newValue) => {
    try {
      await AsyncStorage.setItem(
        CADETLIST1C_STORAGE_KEY,
        JSON.stringify(newValue)
      );
      setCadetList1c(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveCadetList2c = async (newValue) => {
    try {
      await AsyncStorage.setItem(
        CADETLIST2C_STORAGE_KEY,
        JSON.stringify(newValue)
      );
      setCadetList2c(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveCadetList3c = async (newValue) => {
    try {
      await AsyncStorage.setItem(
        CADETLIST3C_STORAGE_KEY,
        JSON.stringify(newValue)
      );
      setCadetList3c(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  const saveCadetList4c = async (newValue) => {
    try {
      await AsyncStorage.setItem(
        CADETLIST4C_STORAGE_KEY,
        JSON.stringify(newValue)
      );
      setCadetList4c(newValue);
    } catch (e) {
      console.error("Failed to save string value to AsyncStorage", e);
    }
  };

  return {
    company,
    saveCompany,
    cadetList1c,
    saveCadetList1c,
    cadetList2c,
    saveCadetList2c,
    cadetList3c,
    saveCadetList3c,
    cadetList4c,
    saveCadetList4c,
  };
};

export default MyStorage;
