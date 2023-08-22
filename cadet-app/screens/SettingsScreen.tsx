import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SectionList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../firebase";
import { SelectList } from "react-native-dropdown-select-list";
import { EmailAuthProvider } from "firebase/auth";
import MyStorage from "../storage";
import MyFirebaseFunctions from "../firebaseFunctions";

const SettingsScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const { company, saveCompany, year, saveYear, cadetStatus, loadValues } =
    MyStorage({
      initialCompany: "",
      initialYear: "",
      initialCadetStatus: "",
    });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const asyncWrap = async () => {
        loadValues();
      };
      asyncWrap();
    });
    return unsubscribe;
  }, [navigation]);

  const { updateAccountabilityFirestore, deleteCadetFromCompany } =
    MyFirebaseFunctions();

  // const [currentPassword, setCurrentPassword] = useState("");
  // const [newPassword, setNewPassword] = useState("");
  // const [error, setError] = useState(null);
  // const [success, setSuccess] = useState(false);
  const [selected, setSelected] = useState("");

  const companyPickerData = [
    { key: "1", value: "Alfa" },
    { key: "2", value: "Bravo" },
    { key: "3", value: "Charlie" },
    { key: "4", value: "Delta" },
    { key: "5", value: "Echo" },
    { key: "6", value: "Foxtrot" },
    { key: "7", value: "Golf" },
    { key: "8", value: "Hotel" },
  ];

  const yearPickerData = [
    { key: "1", value: "2024" },
    { key: "2", value: "2025" },
    { key: "3", value: "2026" },
    { key: "4", value: "2027" },
  ];

  function LogoutWidget() {
    return (
      <View>
        <Button title="logout" onPress={handleLogOut} />
      </View>
    );
  }

  const handleMove = () => {
    navigation.navigate("Change Password");
  };

  function ChangePasswordWidget() {
    return (
      //onPress={navigation.navigate("Change Password")}
      <View>
        <Text onPress={handleMove}>Change Password</Text>
      </View>
    );
  }

  const DATA = [
    {
      title: "Cadet Info",
      data: [
        <View>
          <Text>Current Company: {company}</Text>
          <SelectList
            onSelect={() => handleCompanyChange()}
            setSelected={setSelected}
            data={companyPickerData}
            save="value"
            placeholder="Change your company here"
          />
        </View>,
        <View>
          <Text>Current Class Year: {year}</Text>
          <SelectList
            onSelect={() => handleYearChange()}
            setSelected={setSelected}
            data={yearPickerData}
            save="value"
            placeholder="Change your class year here"
          />
        </View>,
      ],
    },
    {
      title: "",
      data: [<ChangePasswordWidget />],
    },
    {
      title: "Other",
      data: [<LogoutWidget />],
    },
  ];

  const handleCompanyChange = async () => {
    const email = auth.currentUser.email;
    await deleteCadetFromCompany(email, company);
    await saveCompany(selected);
    await updateAccountabilityFirestore(email, cadetStatus, year, selected);
  };

  const handleYearChange = async () => {
    await saveYear(selected);
    const email = auth.currentUser.email;
    await updateAccountabilityFirestore(email, cadetStatus, selected, company);
  };

  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigation.navigate("Login");
    });
  };

  // const handleChangePassword = () => {
  //   const credential = EmailAuthProvider.credential(
  //     user.email,
  //     currentPassword
  //   );
  //   user
  //     .reauthenticateWithCredential(credential)
  //     .then(() => {
  //       user.updatePassword(newPassword);
  //       setSuccess(true);
  //       setCurrentPassword("");
  //       setNewPassword("");
  //       setError(null);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       setSuccess(false);
  //     });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        style={styles.sectionList}
        sections={DATA}
        keyExtractor={(item, index) => `${item} + ${index}`} // i have no clue what this line does
        renderItem={({ item, index, section }) => (
          <View
            style={[
              styles.item,
              index === 0 && styles.itemFirst,
              index === section.data.length - 1 && styles.itemLast,
            ]}
          >
            {item}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>

    // <SafeAreaView style={styles.container}>
    //   <Button title="logout" onPress={handleLogOut} />
    //   <View style={styles.form}>
    //     <TextInput
    //       style={styles.input}
    //       placeholder="Current password"
    //       value={currentPassword}
    //       onChangeText={setCurrentPassword}
    //       secureTextEntry={true}
    //     />
    //     <TextInput
    //       style={styles.input}
    //       placeholder="New password"
    //       value={newPassword}
    //       onChangeText={setNewPassword}
    //       secureTextEntry={true}
    //     />
    //     {error && <Text style={styles.error}>{error}</Text>}
    //     {success && <Text style={styles.success}>Password updated!</Text>}
    //     <Button title="Change password" onPress={handleChangePassword} />
    //   </View>
    //   <View>
    //     <SelectList
    //       onSelect={() => handleCompanyChange(selected)}
    //       setSelected={setSelected}
    //       data={companyPickerData}
    //       save="value"
    //       placeholder="Change your company here"
    //     />
    //     <Text>Company: {company}</Text>
    //     <SelectList
    //       onSelect={() => handleYearChange(selected)}
    //       setSelected={setSelected}
    //       data={yearPickerData}
    //       save="value"
    //       placeholder="Change your class year here"
    //     />
    //     <Text>Year: {year}</Text>
    //   </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#015289",
    marginVertical: 16,
  },
  form: {
    marginVertical: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  success: {
    color: "green",
    marginBottom: 8,
  },
  sectionList: {
    flex: 1,
    width: "100%",
  },
  item: {
    backgroundColor: "#fff",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    padding: 8,
  },
  itemFirst: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  itemLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomWidth: 0,
  },
  header: {
    marginVertical: 8,
    backgroundColor: "#eee",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
