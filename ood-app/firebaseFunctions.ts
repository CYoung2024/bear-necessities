// Holds tools for saving stuff to firebase

import firebase from "firebase/compat/app";
import { doc, setDoc } from "firebase/firestore";

const MyFirebaseFunctions = () => {
  const db = firebase.firestore();

  const fetchAccountabilityOfCompany = async (company) => {
    const cadetListFull = db.collection(company).doc("CadetList");
    let output = [];
    await cadetListFull
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          Object.entries(data).forEach(([pulledEmail, pulledValue]) => {
            output.push([pulledEmail, pulledValue]);
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
    return output;
  };

  return {
    fetchAccountabilityOfCompany,
  };
};

export default MyFirebaseFunctions;
