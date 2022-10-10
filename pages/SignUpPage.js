import React,{useEffect,useState} from "react";
import { StyleSheet, ImageBackground,View, Text, TextInput,TouchableOpacity } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {registration} from '../config/firebaseFunctions'

export default function SignUpPage({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');

  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showPwCheckError, setShowPwCheckError] = useState(false);

  const checkName = (name) => {
    if (name) {
      setName(name)
      setShowNameError(false);
    } else {
      setShowNameError(true);
      setName("");
    }
  };
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
  const checkPwCheck = (pwCheck) => {
    if (pwCheck || password==pwCheck) {
      setPwCheck(pwCheck)
      setShowPwCheckError(false);
    } else {
      setShowPwCheckError(true);
      setPwCheck("");
    }
  };

  const doSignUp = () => {
    checkName(name)
    checkEmail(email)
    checkPassword(password)
    checkPwCheck(pwCheck)
    if(!showNameError && !showEmailError && !showPasswordError && !showPwCheckError) {
      registration(name, email, password);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown:false
    })
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.mainImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Ftitle.jpg?alt=media&token=ccb33f75-83fc-45f1-a44b-f15d64b88562" }}>
          <TouchableOpacity onPress={() => {navigation.goBack(); }}>
            <MaterialCommunityIcons name="arrow-left" size={40} color="white" style={{marginTop:40,marginLeft:20}} />
          </TouchableOpacity>
          <View style={styles.content} >
            <Text style={styles.title}>BOokTOdo Sign-Up</Text>

            <TextInput placeholder="  nickname" placeholderTextColor={'white'} value={name} onChangeText={(text)=>checkName(text)} style={styles.input}/>
            {showNameError && (
              <Text style={styles.errorTextStyle}>
                닉네임을 입력해주세요.
              </Text>
            )}
            <TextInput placeholder="  E-mail" placeholderTextColor={'white'} value={email} onChangeText={(text)=>checkEmail(text)} style={styles.input}/>
            {showEmailError && (
              <Text style={styles.errorTextStyle}>
                이메일을 입력해주세요.
              </Text>
            )}
            <TextInput placeholder="  Password" placeholderTextColor={'white'} value={password} secureTextEntry={true} onChangeText={(text)=>checkPassword(text)} style={styles.input}/>
            {showPasswordError && (
              <Text style={styles.errorTextStyle}>
                비밀번호를 입력해주세요.
              </Text>
            )}
            <TextInput placeholder="  Password check" placeholderTextColor={'white'} value={pwCheck} secureTextEntry={true} onChangeText={(text)=>checkPwCheck(text)} style={styles.input}/>
            {showEmailError && (
              <Text style={styles.errorTextStyle}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
            <TouchableOpacity style={styles.emailSignUp} onPress={doSignUp}>
                <Text style={{color:'white',textAlign:'center'}}>회원가입</Text>
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
      marginTop:20,
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
      width:"80%",
      height:30,
      color:'white',
      borderBottomWidth:1,
      borderBottomColor:'white',
      alignSelf:'center',
      marginBottom:20,
    },
    emailSignUp:{
      width:'90%',
      alignSelf:'center',
      padding:15,
      backgroundColor:'black',
      borderRadius:15,
      borderWidth:2,
      borderColor:'white',
    },
    errorTextStyle: {
      color: "#FF0000",
      marginBottom: 10,
      marginLeft:20,
      fontSize:12,
    },
  });
  