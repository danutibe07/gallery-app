import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyBPIHo-b5TmnBoDunCZ9VcGdfnb6acly4Y',
  authDomain: 'hng-gallery.firebaseapp.com',
  projectId: 'hng-gallery',
  storageBucket: 'hng-gallery.appspot.com',
  messagingSenderId: '296851233734',
  appId: '1:296851233734:web:7f9ccf7ca51034906530c7',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const projectStorage = firebaseApp.storage();
const projectFirestore = firebaseApp.firestore();
const authentication = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp , authentication};

