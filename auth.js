//Initialize firebase db, authentication, and firebase connection
var firebaseConfig = {
  apiKey: "AIzaSyCvP81rw_ziWoL4qp2Rhkf5s7lovdJ99ZE",
  authDomain: "csc264group4.firebaseapp.com",
  databaseURL: "https://csc264group4.firebaseio.com",
  projectId: "csc264group4",
  storageBucket: "csc264group4.appspot.com",
  messagingSenderId: "1093036098818",
  appId: "1:1093036098818:web:cbb66df40d42785d23ee1b"

};



// Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Declare constants for the authentication state and the database so they can be used in other JS files.
const auth = firebase.auth();
const db = firebase.firestore();


