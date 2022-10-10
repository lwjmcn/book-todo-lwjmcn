import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView,TextInput,Platform, Alert } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'

import data from '../data.json'
import Loading from '../components/Loading';
import { firebase_db } from "../config/firebaseConfig"
import { userUniqueId } from "../components/User";

// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'expo-ads-admob';

// import * as Application from 'expo-application';
// const isIOS = Platform.OS === 'ios';


export default function IngDetailPage({ navigation, route }) {
  const Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  const Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const [book,setBook] = useState({
    "idx": 0,
    "category": "ing",
    "title": "잘될 수밖에 없는 너에게",
    "author": "최서영",
    "pubYear": "2022",
    "image": "https://shopping-phinf.pstatic.net/main_3410601/34106011618.20220818093442.jpg?type=w300",
    "desc": "",
    "why": "",
    "comment": "",
    "shortComment": "",
    "ifMain": 0,
    "star": "3",
    "date": "",
    "bookmark": ""
  })
  const [star,setStar]= useState('')

  useEffect(() => {
  navigation.setOptions({
    title: 'Detail',
    headerStyle: {
      backgroundColor: '#000',
      shadowColor: "#000",
    },
    headerTintColor: "#fff",
  })
  const {idx} = route.params;
  getBookDetail(idx)
},[book])
  
  const getBookDetail = async (cidx) => {
    firebase_db.ref('/books/' + userUniqueId+'/'+cidx).once('value').then((snapshot) => {
      let book = snapshot.val();
      setBook(book)
      setStar(book.star)
    })
  }

  const stateToWill = () => {
    firebase_db.ref('/books/' + userUniqueId+'/' + book.idx).update({
      category: "will"
    }).catch(function (error) {
      Alert.alert("State Update failed: " + error.message)
    });
  }
  const stateToIng = () => {
    firebase_db.ref('/books/' +userUniqueId+'/'+ book.idx).update({
      category: "ing"
    }).catch(function (error) {
      Alert.alert("State Update failed: " + error.message)
    });
  }
  const stateToDone = () => {
    firebase_db.ref('/books/' + userUniqueId+'/'+book.idx).update({
      category: "done"
    }).then(function () {
      Alert.alert("완독을 축하드려요🎉")
    }).catch(function (error) {
      Alert.alert("State Update failed: " + error.message)
    });
  }  

  const setStarRate = (rate) => {
    setStar(rate)
    firebase_db.ref('/books/' + userUniqueId+'/'+book.idx).update({
      star: rate
    }).catch(function (error) {
      Alert.alert("State Update failed: " + error.message)
    });
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bookInfo}>
        <Image style={styles.bookImage} source={{ uri: book.image }} resize="contain" shadowOffset={38} shadowBlurRadius={48} shadowBackgroundColor={'#ffffff'} />
        <View style={styles.bookText}>
          <Text style={styles.bookTitle}>{book.title} ({book.pubYear})</Text>
          <Text style={styles.bookAuthor}>{book.author} 저</Text>
          <Text style={styles.bookDesc} numberOfLines={3}>{book.desc}</Text>
        </View>
      </View>
      <View style={styles.yours}>
        <View style={styles.buttonGroup}>
         
         <TouchableOpacity style={styles.stateButton} onPress={()=>stateToWill()}><MaterialCommunityIcons name="timer-sand" size={15} color="gray" /><Text style={styles.stateText}>읽기전</Text></TouchableOpacity>
         <TouchableOpacity style={styles.stateButton} onPress={()=>stateToIng()}><MaterialCommunityIcons name="timer-sand-paused" size={15} color="gray" /><Text style={styles.stateText}>읽는중</Text></TouchableOpacity>
          <TouchableOpacity style={styles.stateButton} onPress={() => stateToDone()}><MaterialCommunityIcons name="timer-sand-complete" size={15} color="gray" /><Text style={styles.stateText}>읽음</Text></TouchableOpacity>
        </View>
        {book.category == "done" && (
          <View style={{marginBottom:40}}>
            <Text style={styles.head}>🔥 별점 남기기</Text>
            <View>
              {star == 1 && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setStarRate(1)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(2)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(3)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(4)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(5)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                </View>
              )}
              {star == 2 && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setStarRate(1)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(2)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(3)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(4)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(5)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                </View>
              )}
              {star == 3 && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setStarRate(1)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(2)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(3)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(4)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(5)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                </View>
              )}
              {star == 4 && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setStarRate(1)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(2)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(3)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(4)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(5)}><Image style={styles.StarImage} source={{ uri: Star_With_Border }} /></TouchableOpacity>
                </View>
              )}
              {star == 5 && (
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => setStarRate(1)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(2)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(3)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(4)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                  <TouchableOpacity onPress={() => setStarRate(5)}><Image style={styles.StarImage} source={{ uri: Star }} /></TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        )}
        <View style={{flexDirection:'row'}}>
          <Text style={styles.head}>🔥 읽고 싶었던 이유</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible2(true)}><Text style={styles.editButtonText}>Edit</Text></TouchableOpacity>
        </View>
        <View style={styles.desc}>
          <Text style={styles.bookComment}>  {book.why}</Text>
        </View>
        {book.category == "ing" && (
          <View style={{flexDirection:'row'}}>
            <Text style={styles.head}>🔥 북마크</Text>
            <TextInput placeholder="0" style={styles.bookMark}> 
              {book.bookmark}
            </TextInput>
            <Text style={{fontSize: 15, color:"#585858",marginTop:23}}>  페이지까지 읽었어요!</Text>
          </View>
        )}
        {book.category != "will" && (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>🔥 감상</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible2(true)}><Text style={styles.editButtonText}>Edit</Text></TouchableOpacity>
            </View>
            <View style={styles.desc}>
              <Text style={styles.bookComment}>  {book.comment}</Text>
            </View>
          </View>
        )}
        {book.category == "done" && (
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.head}>🔥 한 줄 후기</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible2(true)}><Text style={styles.editButtonText}>Edit</Text></TouchableOpacity>
            </View>
            <View style={styles.descLast}>
              <Text style={styles.bookComment}>  " {book.shortComment} "</Text>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.goBack()}}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  bookInfo: {
    flex:1,
    flexDirection:'row',
    marginTop:30,
    padding:30,
    borderBottomWidth:2,
    borderBottomColor:"#eee",
  },
  bookImage: {
    flex:1,
    width: 100,
    height: 170,
    alignSelf: "center",
    shadowColor: 'gray',
    shadowOffset: { height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 20
  },
  bookText: {
    flex:2,
    flexDirection:"column",
    justifyContent:'flex-end',
    marginTop: 10,
    marginLeft: 15
  },
  bookStar:{
    fontSize:15,
    marginBottom:10,
  },
  bookTitle: {
    fontSize:20,
    fontWeight:"700", 
  },
  bookAuthor: {
    fontSize:15,
    marginBottom:10,
  },
  bookDesc: {
    fontSize: 12,
    color:'#A6A6A6'
  },
  yours:{
    flex:2,
    padding: 20,
  },
  buttonGroup:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginBottom:30,
  },
  stateButton:{
    flexDirection:'row',
    backgroundColor:'#eee',
    alignItems:'center',
    justifyContent:'center',
    marginRight:20,
    paddingHorizontal:10,
    paddingVertical:5,
    borderRadius:20,
  },
  stateText:{
    color:'gray',
    fontSize:15,
    marginLeft:5,
  },
  head: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 20,
  },
  bookMark:{
    width:60,
    height:25,
    backgroundColor:"#eee",
    marginTop:20,
    marginLeft:20,
    paddingRight:10,
    borderRadius:5,
    textAlign: 'right'
  },
  desc: {
    minHeight: 200,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginBottom: 40,
    padding:15,
    paddingBottom: 30,

  },
  descLast: {
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginBottom: 40,
    padding:10,
  },
  bookComment: {
    fontSize: 15,
    color:"#585858"
  },
  button:{
    width:80,
    marginTop:20,
    marginBottom: 30,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'black'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  StarImage: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  editButton:{
    width:50,
    height:25,
    marginTop:20,
    marginLeft:10,
    paddingHorizontal: 2,
    borderRadius: 20,
    justifyContent:'center',
    backgroundColor: 'black'
  },
  editButtonText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center'
  },
});
