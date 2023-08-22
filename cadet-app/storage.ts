// Holds tools for local storage

import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "./firebase";

const COMPANY_STORAGE_KEY = "@MyApp:CompanyKey";
const YEAR_STORAGE_KEY = "@MyApp:YearKey";
const CADETSTATUS_STORAGE_KEY = "@MyApp:CadetStatusKey";

const user = auth.currentUser;

const MyStorage = ({ initialCompany, initialYear, initialCadetStatus }) => {
  const [company, setCompany] = useState(initialCompany);
  const [year, setYear] = useState(initialYear);
  const [cadetStatus, setCadetStatus] = useState(initialCadetStatus);
  //const [lastUser, setLastUser] = useState(initialLastUser);

  const loadValues = async () => {
    try {
      const company = await AsyncStorage.getItem(COMPANY_STORAGE_KEY);
      const year = await AsyncStorage.getItem(YEAR_STORAGE_KEY);
      const cadetStatus = await AsyncStorage.getItem(CADETSTATUS_STORAGE_KEY);
      setCompany(company !== null ? company : initialCompany);
      setYear(year !== null ? year : initialYear);
      setCadetStatus(cadetStatus !== null ? cadetStatus : initialCadetStatus);
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

  const saveYear = async (newValue) => {
    try {
      await AsyncStorage.setItem(YEAR_STORAGE_KEY, newValue);
      setYear(newValue);
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

  return {
    company,
    saveCompany,
    year,
    saveYear,
    cadetStatus,
    saveCadetStatus,
    loadValues,
  };
};

export default MyStorage;
