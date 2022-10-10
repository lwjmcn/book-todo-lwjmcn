import firebase from "firebase/compat";
import "firebase/compat/firestore";
import { Alert, AsyncStorage } from "react-native";


export async function registration(nickName, email, password, navigation) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser; //authentication
    const db = firebase.firestore(); //cloud
    db.collection("users").doc(currentUser.uid).set({
      email: currentUser.email,
      nickName: nickName,
    });
    await AsyncStorage.setItem("session",email);
    Alert.alert("회원가입 성공");
    navigation.push('MainPage');
  } catch (err) {
    Alert.alert("회원가입 실패 -> ", err.message);
  }
}

export async function signIn(email, password, navigation) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    await AsyncStorage.setItem("session",email);
    navigation.push("MainPage");
  } catch (err) {
    Alert.alert("로그인 실패 -> ", err.message);
  }
}

export async function logout(navigation) {
  try {
    const currentUser = firebase.auth().currentUser;
    await AsyncStorage.removeItem("session");
    await firebase.auth().signOut();
    navigation.push("SignInPage");
  } catch (err) {
    Alert.alert("로그아웃 실패 -> ", err.message);
  }
}
