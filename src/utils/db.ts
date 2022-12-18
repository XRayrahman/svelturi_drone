import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7NofF7QkAEl9SUrOPSODyaNQi2aDvOKs",
    authDomain: "redrone-c1bbc.firebaseapp.com",
    databaseURL:
        "https://redrone-c1bbc-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "redrone-c1bbc",
    storageBucket: "redrone-c1bbc.appspot.com",
    messagingSenderId: "1045502316674",
    appId: "1:1045502316674:web:bdb793469c000717d1a49b",
    measurementId: "G-YEW41B5271",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const querySnapshot = await getDocs(collection(db, "detection"));
querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
});

export { db };