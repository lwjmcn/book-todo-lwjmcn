import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import AddPage from "../pages/AddPage";
// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// // } from 'expo-ads-admob'; //admob 광고 추가

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Book({ content, navigation }) {

  
//   useEffect(() => {
//     Platform.OS === 'ios' ? AdMobInterstitial.setAdUnitID("ca-app-pub-7292709760794607/7112217304") : AdMobInterstitial.setAdUnitID("ca-app-pub-7292709760794607/1214939085")
//     AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
//       console.log("interstitialDidLoad")
//     );
//     AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
//       console.log("interstitialDidFailToLoad")
//     );
//     AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
//       console.log("interstitialDidOpen")
//     );
//     AdMobInterstitial.addEventListener("interstitialDidClose", () => {
//       //광고가 끝나면 다음 코드 줄이 실행!
//       console.log("interstitialDidClose")
//     });
//   }, [])
//   const goDetail = async () => {
//     try {
//       await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true }); // 개인화 광고
//       await AdMobInterstitial.showAdAsync(); // 광고 노출
//       await navigation.navigate('DetailPage', { idx: content.idx }) //광고 이후 화면 이동
//     } catch (error) {
//       console.log(error)
//       await navigation.navigate('DetailPage', { idx: content.idx })
//     }
//   }
// }

    const [result, setResult] = useState(null);
    const link = async (url) => {
      let result = await WebBrowser.openBrowserAsync(url);
      setResult(result);
      Alert.alert(result && JSON.stringify(result))
    };

    return (
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardBook} onPress={()=>link(content.link)}>
          <Image style={styles.bookImage} resizeMode='contain' source={{ uri:content.image }} />
          <View style={styles.cardText}>
            <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
            <Text style={styles.cardAuthor} >{"- " + content.author + " 저"}</Text> 
            <Text style={styles.bookDesc} numberOfLines={3}>{content.desc}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.choose} onPress={() => { navigation.navigate('AddPage',content) }}>
          <Text style={styles.choosing}>선택</Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({

  card:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:0.5,
    borderBottomColor:"black",
  },
  bookImage: {
    flex:1,
    width:"100%",
    height:80,
    marginLeft:10,
    alignSelf:'center',
  },
  cardBook: {
    flex:9,
    flexDirection:"row",
  },
  cardText: {
    flex:4,
    flexDirection:"column",
    marginLeft:15,
    justifyContent:'center'
  },
  cardTitle: {
    fontSize:20,
    fontWeight:"700"
  },
  cardAuthor: {
    fontSize:15,
  },
  rightAlign: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  choose: {
    flex:1,
    width:30,
    height:20,
    marginLeft:30,
    marginRight:10,
    borderRadius:10,
    borderColor:'#A6A6A6',
    borderWidth:1,
  },
  choosing: {
    fontSize:13,
    alignSelf:'center',
    textAlign:'center',
    color:'#A6A6A6'
  }
});