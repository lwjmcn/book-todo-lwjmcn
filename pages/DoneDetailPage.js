import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

import data from '../data.json'
import Loading from '../components/Loading';
import { user } from "../components/User";

// import { firebase_db } from "../firebaseConfig"
// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'expo-ads-admob';

// import * as Application from 'expo-application';
// const isIOS = Platform.OS === 'ios';


export default function DoneDetailPage({ navigation, route }) {

  let book = {
    "idx": 0,
    "category": "ing",
    "title": "잘될 수밖에 없는 너에게",
    "author": "최서영",
    "pubYear": "2022",
    "image": "https://shopping-phinf.pstatic.net/main_3410601/34106011618.20220818093442.jpg?type=w300",
    "desc": "무엇과도 바꿀 수 없는 소중한 내 인생에\n욕심과 확신을 만들어주는 단 한 권의 책이 탄생하다\n대학에서 법을 공부하고 사회에 나와서는 아나운서로 일하다가 마침내 그 모든 것을 뒤로하고 새 롭게 자기만의 길을 찾아낸 크리에이터 최서영. 여전히 자신의 삶을 일구고 가꾸며 열심히 사는 저자에게는 늘 이런 반응이 따른다. “덕분에 소심했던 제 인생이 달라졌어요.” “확신 없던 내 삶을 믿을 수 있게 되었어요.” “저에게 꼭 필요한 메시지였어요.” “아침부터 동기부여받고 갑니다!” 모두가 인생을 더 나은 쪽으로 ‘레벨 업(Level up)’시키고 싶어 하지만, 그 방법을 모르거나 동기부 여를 받지 못해 제자리에만 머물러 있다. 그런 이들을 위해 저자는 《잘될 수밖에 없는 너에게》에 서 바로 적용 가능한 자기 탐구 방법, 멍청해지지 않기 위한 루틴, 매력 관리법을 알려주고 인간 관계를 유지하거나 손절할 때 필요한 기술, 회사원과 프리랜서를 모두 경험하며 느낀 일 잘하는 방법 등을 빠짐없이 공유한다. 또 책 말미에 멘탈이 흔들릴 때 필요한 인생 문장들을 부록으로 실어 필요할 때마다 찾아볼 수 있게 구성했다.",
    "why": "자기계발서. 읽고 싶었던 이유가 무엇인가요? 읽고 싶었던 이유가 무엇인가요? 읽고 싶었던 이유가 무엇인가요? 읽고 싶었던 이유가 무엇인가요? ",
    "comment": "읽으면서 잊지 않도록 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n읽으면서 잊지 않도록 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n읽으면서 잊지 않도록 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. 읽으면서 후기를 남겨보세요. \n\n",
    "shortComment": "",
    "ifMain": 0,
    "star": "⭐⭐⭐⭐⭐",
    "date": "",
    "bookmark": "201"
  }
  // const [todo, setTodo]=({

  // })

  useEffect(() => {
  navigation.setOptions({
    title: 'Detail',
    headerStyle: {
      backgroundColor: '#000',
      shadowColor: "#000",
    },
    headerTintColor: "#fff",
  })
},1000)

  // const { idx } = route.params;
  // firebase_db.ref('/tip/' + idx).once('value').then((snapshot) => {
  //   let tip = snapshot.val();
  //   setTip(tip)
  // });


  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.bookInfo}>
        <Image style={styles.bookImage} source={{ uri: book.image }} resize="contain" shadowOffset={38} shadowBlurRadius={48} shadowBackgroundColor={'#ffffff'} />
        <View style={styles.bookText}>
          <Text style={styles.bookStar}>{book.star}</Text>
          <Text style={styles.bookTitle}>{book.title} ({book.pubYear})</Text>
          <Text style={styles.bookAuthor}>{book.author} 저</Text>
          <Text style={styles.bookDesc} numberOfLines={3}>{book.desc}</Text>
        </View>
      </View>
      <View style={styles.yours}>
        <Text style={styles.head}>🔥 읽고 싶었던 이유</Text>
        <View style={styles.desc}>
          <Text style={styles.bookComment}>  {book.why}</Text>
        </View>

        <Text style={styles.head}>🔥 감상</Text>
        <View style={styles.desc}>
          <Text style={styles.bookComment}>  {book.comment}</Text>
        </View>

        <Text style={styles.head}>🔥 한 줄 후기</Text>
        <View style={styles.descLast}>
          <Text style={styles.bookComment}>  " {book.shortComment} "</Text>
        </View>

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
    marginTop: 20,
  },
  head: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
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
  }
});
