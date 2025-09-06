import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyARTj0C63mKNHuhp0kxdciczVS4_vMxbJo",
  authDomain: "partzoneadmin.firebaseapp.com",
  databaseURL: "https://partzoneadmin-default-rtdb.firebaseio.com",
  projectId: "partzoneadmin",
  storageBucket: "partzoneadmin.appspot.com",
  messagingSenderId: "714743852681",
  appId: "1:714743852681:web:16b478deb50024952c2058"
}

firebase.initializeApp(firebaseConfig)

export const database = firebase.database()
export default firebase
