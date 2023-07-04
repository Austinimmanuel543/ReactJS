import firebase from 'firebase'
import 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "tienda-plantr.firebaseapp.com",
    projectId: "tienda-plantr",
    storageBucket: "gs://tienda-plantr.appspot.com/",
    messagingSenderId: "695629540420",
    appId: "1:695629540420:web:7e99b88c51351f757f2011"
})

export const getFirebase = () => app
export const getFirestore = () => firebase.firestore(app)