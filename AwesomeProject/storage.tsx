import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



const CADETSTATUS_STORAGE_KEY = "@MyApp:CadetStatusKey";
const COMPANY_STORAGE_KEY = "@MyApp:CompanyKey";
const YEAR_STORAGE_KEY = "@MyApp:YearKey";



const MyStorage = ({ initialCompany, initialYear, initialCadetStatus }) => {



    const [cadetStatus, setCadetStatus] = useState(initialCadetStatus);
    const [company, setCompany] = useState(initialCompany);
    const [year, setYear] = useState(initialYear);



    const loadValues = async () => {

        try {

            const cadetStatus = await AsyncStorage.getItem(CADETSTATUS_STORAGE_KEY);
            const company = await AsyncStorage.getItem(COMPANY_STORAGE_KEY);
            const year = await AsyncStorage.getItem(YEAR_STORAGE_KEY);

            setCadetStatus(cadetStatus !== null ? cadetStatus : initialCadetStatus);
            setCompany(company !== null ? company : initialCompany);
            setYear(year !== null ? year : initialYear);

        } catch (e) {

            console.error("Failed to load values from AsyncStorage", e);
            
        }

    };

    useEffect(() => {
        loadValues();
    }, []);


    const saveCadetStatus = async (newValue) => {
        try {
            await AsyncStorage.setItem(CADETSTATUS_STORAGE_KEY, newValue);
            setCadetStatus(newValue);
        } catch (e) {
            console.error("Failed to save string value to AsyncStorage", e);
        }
    };


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