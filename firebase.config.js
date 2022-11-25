// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyA-YjIpkKDVLA66XsRTvDajChLPeG1FVEw",
  authDomain: "vendor-dev-a8bda.firebaseapp.com",
  projectId: "vendor-dev-a8bda",
  storageBucket: "vendor-dev-a8bda.appspot.com",
  messagingSenderId: "879111240156",
  appId: "1:879111240156:web:4b54516b48588724c03719",
  measurementId: "G-JYL2W2STP1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();

// export const firestore = firebase.firestore();
// const provider = new firebase.auth.GoogleAuthProvider();
// provider.setCustomParameters({prompt: 'select_account'});
// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
