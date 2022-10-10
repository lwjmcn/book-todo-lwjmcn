import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, ScrollView, Platform } from 'react-native';
import { FAB } from 'react-native-elements'

import Card from '../components/Card';
import Loading from '../components/Loading';
import { firebase_db } from "../config/firebaseConfig";
import { userUniqueId } from "../components/User";
// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'expo-ads-admob';

export default function MainPage({ navigation, route }) {

  const [state, setState] = useState([])
  const [todo,setTodo] = useState([])
  const [ready, setReady] = useState(true)

  const ing = todo.filter((t) => t.category == "ing")
  const will = todo.filter((t) => t.category == "will")
  const done = todo.filter((t) => t.category == "done")


  useEffect(() => {
    navigation.setOptions({
      title: 'ToDo-List'
    })
    //로그인, 회원가입 후 메인페이지로 왔을 때 뒤로가기 막기
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    }); 
    setTimeout( async() => {
      firebase_db.ref('/books/'+userUniqueId).once('value').then((snapshot) => {
        let book = snapshot.val();        
        let book_list = Object.values(book)
        if (book_list && book_list.length > 0) {
          setTodo(book_list)
          setReady(false)
        }
      })
      setReady(false)
    });
  }, [todo])

  return ready ? <Loading /> : (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground style={styles.mainImage} resize="cover" source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Ftitle.jpg?alt=media&token=ccb33f75-83fc-45f1-a44b-f15d64b88562" }}>
        <ScrollView style={styles.cardContainer}>
          {
            ing.map((content, i) => {
              return (<Card content={content} key={i} navigation={navigation} />)
            })
          }
          {
            will.map((content, i) => {
              return (<Card content={content} key={i} navigation={navigation} />)
            })
          }
          {done.length != 0 && (<Text style={styles.doneList}>☆*:｡. 완독 .｡:*☆</Text>)}
          {
            done.map((content, i) => {
              return (<Card content={content} key={i} navigation={navigation} />)
            })
          }
          {todo.length == 0 && (
            <View>
              <Image style={styles.stateImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fnodata.png?alt=media&token=4cd52398-6bb0-45bb-bcae-29b012071e17" }} />
              <Text style={styles.head}>아직 등록된 책이 없습니다.</Text>
              <Text style={styles.desc}>아래 +버튼을 통해 읽고 싶은 책을 추가해보세요</Text>
            </View>
          )}

          <View style={{ marginTop: 10 }}></View>
        </ScrollView>
      <FAB onPress={() => { navigation.navigate('AddPage',{})}} placement="right" size="large" icon={{ name: 'add', color: 'white' }} style={styles.button} buttonStyle={{backgroundColor:"black"}}/>
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
  cardContainer: {
    marginTop:300,
    margin:10,
    paddingTop:20,
    borderRadius:20,    
    backgroundColor: '#fff',
  },
  doneList:{
    alignItems:'center',
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    paddingLeft:30,
    paddingBottom:10,
    marginBottom:10,
    color:'gray'
  },
  button: {
    margin: 30,
    //larger size
    backgroundColor:'black',
    borderRadius:100,
    borderWidth:8,
    borderColor:'black'
  },
  stateImage: {
    width:80,
    height:80,
    marginTop:60,
    alignSelf:'center',
  },
  head: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 30,
    marginBottom: 10,
    alignSelf:'center',
  },
  desc: {
    fontSize: 15,
    color:"#585858",
    alignSelf:'center',
  },
});
