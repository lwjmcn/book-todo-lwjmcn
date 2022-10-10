import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBAwbQae-1EcnPoxQ4RLSrYiV6VIkpxxvc",
    authDomain: "book-todo-lwjmcn.firebaseapp.com",
    databaseURL: "https://book-todo-lwjmcn-default-rtdb.asia-southeast1.firebasedatabase.app/",
    //위 databaseURL은 firebase에서 기본제공 해주지 않으니 직접 작성해주세요!
    projectId: "book-todo-lwjmcn",
    storageBucket: "book-todo-lwjmcn.appspot.com",
    messagingSenderId: "1021084114425",
    appId: "1:1021084114425:web:91702d7ec1850a4b48f128",
    measurementId: "G-Z3B52H280N"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database()