import firebase from "firebase/app";

import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  projectId: process.env.FIREBASE_PROJECT_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const uploadFile = async (file, fileName) => {
  const storageRef = await firebase.storage().ref().child(fileName);
  try {
    let snapshot = await storageRef.put(file);
    let downloadURL = await snapshot.ref.getDownloadURL();
    return downloadURL;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { firebase };
