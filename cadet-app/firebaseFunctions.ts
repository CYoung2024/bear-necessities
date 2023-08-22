// Holds tools for saving stuff to firebase

import firebase from "firebase/compat/app";
import { doc, setDoc } from "firebase/firestore";

const MyFirebaseFunctions = () => {
  const db = firebase.firestore();

  const updateAccountabilityFirestore = async (
    email,
    cadetStatus,
    year,
    company
  ) => {
    if (cadetStatus === undefined) {
      console.log("bruh");
    }
    const email_ = email.replace(/\./g, "_");
    const cadetThingsAll = cadetStatus + "/" + year + "/" + company;
    const cadetThingsShort = cadetStatus + "/" + year;
    const cadetList = db.collection(company).doc("CadetList");
    cadetList.update({
      [email_]: cadetThingsShort,
    });
    await setDoc(doc(db, "Cadets", email), {
      status: cadetThingsAll,
    });
    console.log("Firebase updated!");
  };

  const fetchAccountabilityFirestore = async (email) => {
    const cadetList = db.collection("Cadets").doc(email);
    let output = "";
    await cadetList
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          Object.entries(data).forEach(([uselessPlsRefactor, pulledStatus]) => {
            output = pulledStatus;
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

  const deleteCadetFromCompany = async (email, oldCompany) => {
    const email_ = email.replace(/\./g, "_");
    db.collection(oldCompany)
      .doc("CadetList")
      .update({
        [email_]: firebase.firestore.FieldValue.delete(),
      })
      .catch((error) => {
        console.error(`Error removing field from document`, error);
      });
  };

  return {
    updateAccountabilityFirestore,
    fetchAccountabilityFirestore,
    deleteCadetFromCompany,
  };
};

export default MyFirebaseFunctions;
