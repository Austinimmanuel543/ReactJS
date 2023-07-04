import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
import "firebase/storage";
// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
   apiKey: "AIzaSyDTrOyNC5qTXeBzGQYovXGrpwYUIKkxC_0",
   authDomain: "ecom-books.firebaseapp.com",
   projectId: "ecom-books",
   storageBucket: "ecom-books.appspot.com",
   messagingSenderId: "294495034922",
   appId: "1:294495034922:web:3250cb251567d712406d53",
   measurementId: "G-K2EFV6FZRK"
};
// Initialize Firebase
if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
} else {
   firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const fire = { db, auth, storage }

export default fire;