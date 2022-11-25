import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyA-YjIpkKDVLA66XsRTvDajChLPeG1FVEw",
  authDomain: "vendor-dev-a8bda.firebaseapp.com",
  projectId: "vendor-dev-a8bda",
  storageBucket: "vendor-dev-a8bda.appspot.com",
  messagingSenderId: "879111240156",
  appId: "1:879111240156:web:4b54516b48588724c03719",
  measurementId: "G-JYL2W2STP1",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
// export const auth = getAuth(app);
