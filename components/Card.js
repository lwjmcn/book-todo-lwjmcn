import React, { useEffect } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// // } from 'expo-ads-admob'; //admob 광고 추가

// import * as Application from 'expo-application';
// const isIOS = Platform.OS === 'ios'; //삼항연산자

//MainPage로 부터 navigation 속성을 전달받아 Card 컴포넌트 안에서 사용
export default function Card({ content, navigation, todo, setTodo }) {

  // const remove = async (cidx) => {
  //   let userUniqueId;
  //   if (isIOS) {
  //     let iosId = await Application.getIosIdForVendorAsync();
  //     userUniqueId = iosId
  //   } else {
  //     userUniqueId = await Application.androidId
  //   }

  //   firebase_db.ref('/like/' + userUniqueId + '/' + cidx).remove().then(function () {
  //     Alert.alert("삭제되었습니다")
  //     // navigation.navigate('LikePage')

  //     //찜해제를 원하는 카드를 제외한 새로운 찜 데이터(리스트 형태!)를 만든다
  //     let result = tip.filter((data, i) => {
  //       return data.idx !== cidx
  //     })
  //     //LikePage로 부터 넘겨 받은 tip(찜 상태 데이터)를
  //     //filter 함수로 새롭게 만든 찜 데이터를 구성한다!
  //     setTip(result)
  //   }).catch(function (error) {
  //     Alert.alert("Remove failed: " + error.message)
  //   });

  // }
  
//   useEffect(() => {
//     // 전면 광고
//     // Card.js에 들어오자마자 전면 광고 준비하느라 useEffect에 설정
//     // 애드몹도 외부 API 이므로 실행 순서를 지키기위해 async/await 사용!
//     // 안드로이드와 IOS 각각 광고 준비 키가 다르기 때문에 디바이스 성격에 따라 다르게 초기화 시켜줘야 합니다.
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

    const goDetail = () => {
      if(content.category=="ing"||content.category=="will") {
        navigation.navigate('IngDetailPage', { idx: content.idx })
      } else {
        navigation.navigate('DoneDetailPage', { idx: content.idx })
      }
    }

    return (
      <TouchableOpacity style={styles.card} onPress={() => {goDetail()}}>
        <View style={styles.cardBook}>
          {content.category == "ing" && (
            <Image style={styles.stateImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fing.png?alt=media&token=94beda4d-3204-4922-94a6-165419a46641" }} />
          )}
          {content.category == "will" && (
            <Image style={styles.stateImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fwill.png?alt=media&token=da2b0e1b-a78c-41cd-89b7-7107eb744795" }} />
          )}
          {content.category == "done" && (
            <Image style={styles.stateImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fdone.png?alt=media&token=fdb27a92-2ffd-4690-b39b-2d36b24331a4" }} />
          )}
          <View style={styles.cardText}>
            <Text style={styles.cardTitle} numberOfLines={1}>{content.title}</Text>
            {content.author && (
            <Text style={styles.cardAuthor} numberOfLines={1}>{"- " + content.author + " 저"}</Text>
            )}
          </View>
        </View>
        <View style={styles.rightAlign}>
          {content.date && (
          <Text style={styles.cardDate}>{"recently " + content.date}</Text>
          )}
          <Image style={styles.arrowImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Farrow.png?alt=media&token=4e360158-7397-4b65-9c7c-812a9035f1aa" }} />
        </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

  card:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',
    margin:10,
    borderBottomWidth:0.5,
    borderBottomColor:"#eee",
    paddingELeft:20,
    paddingBottom:20,
  },
  stateImage: {
    width:20,
    height:20,
    marginLeft:10,
    alignSelf:'center',
  },
  cardBook: {    
    flex:1,
    flexDirection:"row",
  },
  cardText: {
    flexDirection:"column",
    marginLeft:15
  },
  cardTitle: {
    fontSize:20,
    fontWeight:"700"
  },
  cardAuthor: {
    fontSize:15,
  },
  cardDate: {
    fontSize:10,
    color:"#A6A6A6",
    marginLeft:10,
    alignSelf:'center'
  },
  rightAlign: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-end',
  },
  arrowImage: {
    width:10,
    height:10,
    marginLeft:20,
    marginRight:10
  }
});