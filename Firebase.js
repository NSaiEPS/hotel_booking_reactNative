// import * as firebase from 'firebase/compat';
// // import 'firebase/compat/auth';
// import  "firebase/auth";
// import  "firebase/firestore";
// // import 'firebase/compat/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyCARbTrS3eE2Vwt2rakXxytGFvdg9gakAE",
//     authDomain: "hotel-booking-react-d02c3.firebaseapp.com",
//     projectId: "hotel-booking-react-d02c3",
//     storageBucket: "hotel-booking-react-d02c3.appspot.com",
//     messagingSenderId: "465654460816",
//     appId: "1:465654460816:web:10925912274466bb468315",
//     measurementId: "G-3L4XQ3Q7QT"
//   };

// let app;
// if(firebase.apps.length===0){


// app=firebase.initializeApp(firebaseConfig)
// }
// else {
//   app=firebase.app()
// }

// const db=app.firestore()
// const auth=firebase.auth()
// // const provider= new firebase.auth.GoogleAuthProvider();

// export  {db,auth};

import * as firebase from 'firebase/compat';
// import 'firebase/compat/auth';
// import  "firebase/auth";
import  "firebase/firestore";
// import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCARbTrS3eE2Vwt2rakXxytGFvdg9gakAE",
  authDomain: "hotel-booking-react-d02c3.firebaseapp.com",
  projectId: "hotel-booking-react-d02c3",
  storageBucket: "hotel-booking-react-d02c3.appspot.com",
  messagingSenderId: "465654460816",
  appId: "1:465654460816:web:10925912274466bb468315",
  measurementId: "G-3L4XQ3Q7QT"
};



let app;
if(firebase.apps.length===0){


app=firebase.initializeApp(firebaseConfig)
}
else {
  app=firebase.app()
}

export const db=app.firestore()
// const auth=firebase.auth()
// const provider= new firebase.auth.GoogleAuthProvider();

// export  {db,auth};
// export  {db,auth};



