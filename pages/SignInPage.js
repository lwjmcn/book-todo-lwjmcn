import React, { Component, useState, useEffect } from "react";
import { StyleSheet, ImageBackground, View, Text, TextInput,TouchableOpacity } from "react-native";

export default function SignInPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const checkEmail = (email) => {
    if (email) {
      setEmail(email)
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
      setEmail("");
    }
  };
  const checkPassword = (password) => {
    if (password) {
      setPassword(password)
      setShowPasswordError(false);
    } else {
      setShowPasswordError(true);
      setPassword("");
    }
  };

  const goSignUp = () => {
    navigation.navigate("SignUpPage");
  };

  const doSignIn = () => {
    //Email 로그인 버튼을 누를 때 실행되는 함수
    //관리하는 상태 값을 확인
    checkEmail(email);
    checkPassword(password);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown:false
    })
    //로그아웃 실행 후 로그인 페이지로 갔을 때 뒤로가기 막기
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
    setTimeout(() => {
      AsyncStorage.getItem("session", (err, result) => {
        console.log("ASYNCSTORAGE");
        console.log(result);
        if (result) {
          navigation.push("MainPage");
        } else {
          setReady(true);
        }
      });
      setReady(true);
    }, 1000);
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.mainImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Ftitle.jpg?alt=media&token=ccb33f75-83fc-45f1-a44b-f15d64b88562" }}>
        <View style={styles.content} >
          <Text style={styles.title}>BOokTOdo Login</Text>
          <TextInput placeholder="  E-mail" placeholderTextColor={'white'} value={email} onChangeText={(text)=>checkEmail(text)} style={styles.input}/>
          {showEmailError && (
            <Text style={styles.errorTextStyle}>
              이메일을 입력해주세요.
            </Text>
          )}
          <TextInput placeholder="  Password" placeholderTextColor={'white'} secureTextEntry={true} value={password} onChangeText={(text)=>checkPassword(text)} style={styles.input}/>
          {showPasswordError && (
            <Text style={styles.errorTextStyle}>
              비밀번호를 입력해주세요.
            </Text>
          )}
          <TouchableOpacity style={styles.emailSignIn} onPress={doSignIn}>
            <Text style={{textAlign:'center',fontSize:15}}>E-mail LogIn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailSignUp} onPress={goSignUp}>
            <Text style={{color:"white",textAlign:'center',fontSize:15}}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    }, 
    mainImage: {
      width:"100%",
      height:"100%"
    },
    content: {
      width:'90%',
      height:'80%',
      marginTop:100,
      padding:20,
      alignSelf:'center',
      justifyContent:'center',
      borderRadius:20,    
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    title:{
      fontSize:20,
      textAlign:'center',
      fontWeight:'700',
      color: 'white',
      marginTop:50,
      marginBottom:50,
    },
    input:{
      width:"85%",
      height:40,
      color:'white',
      borderBottomWidth:1,
      borderBottomColor:'white',
      alignSelf:'center',
      marginBottom:10,
    },
    errorTextStyle: {
      color: "#FF0000",
      marginBottom: 10,
      marginLeft:20,
      fontSize:12,
    },
    emailSignIn:{
      width:'100%',
      padding:15,
      backgroundColor:'white',
      borderRadius:15,
      marginTop:20,
      marginBottom:10,
    },
    emailSignUp:{
      width:'100%',
      padding:15,
      backgroundColor:'black',
      borderRadius:15,
      borderWidth:2,
      borderColor:'white',
    },
  });
  