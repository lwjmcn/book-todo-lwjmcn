import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert, TextInput, Modal, useWindowDimensions} from 'react-native';
import HTML from 'react-native-render-html';
// import {WebView} from 'react-native-webview';

import Editor from '../components/Editor';
import Loading from '../components/Loading';
import { userUniqueId } from "../components/User";
import { firebase_db } from "../config/firebaseConfig"
// import {
//   setTestDeviceIDAsync,
//   AdMobBanner,
//   AdMobInterstitial,
//   PublisherBanner,
//   AdMobRewarded
// } from 'expo-ads-admob';

export default function AddPage({ navigation, route }) {
  const width = useWindowDimensions().width;

  const [ready, setReady] = useState(true)

  const [modalVisible, setModalVisible] = useState(false);

  const [imageSrc, setImageSrc] = useState('')  
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [pubYear,setPubYear] = useState('')
  const [desc,setDesc] = useState('')
  const [link,setLink] = useState('')

  const [image,setImage] = useState(null)
  const [descHTML, setDescHTML] = useState("");


  useEffect(() => {
    navigation.setOptions({
      title: 'Add a Book!'
    })
    setTimeout(() => {
      setImageSrc(route.params.image)
      setTitle(route.params.title)
      setAuthor(route.params.author)
      if (route.params.pubdate) {
        setPubYear(route.params.pubdate.substr(0, 4))
      }
      setDesc(route.params.description)
      setLink(route.params.link)

      setReady(false)
    });
  }, [route])

  //등록하기
  const save = async () => {
    const key = firebase_db.ref('/books/' + userUniqueId).push().getKey()
    firebase_db.ref('/books/' + userUniqueId + '/' + key).update({
      idx: key,
      category: "will",
      title: title,
      author: author,
      pubYear: pubYear,
      image: imageSrc,
      desc: desc,
      link: link,
      why: descHTML,
      comment: "",
      shortComment: "",
      ifMain: 0,
      star: 3,
      date: "",
      bookmark: ""
    }).catch(function (error) {
      Alert.alert("idx Update failed: " + error.message)
    });
    navigation.goBack()
  }

  return ready ? <Loading /> : (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.info}>
        <Text style={styles.head}>🔥 읽고 싶은 책이 무엇인가요?</Text>
        <Text>        아래에서 도서를 검색하여 정보를 불러오실 수 있습니다</Text>
      </View>
      <View style={styles.addBook}>
        <TouchableOpacity onPress={() => { navigation.navigate('SearchPage') }} style={styles.addButton}><Text style={styles.addButtonText}>책 불러오기 (Click!)</Text></TouchableOpacity>
        <Text style={styles.warning}>※ 검색되지 않는 도서는 직접 입력해주세요</Text>
        <Text style={styles.warning}>※ 정보에 오류가 있는 경우 수정하실 수 있습니다</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.showPost}>
          <View style={styles.bookInput}>
            <Text style={styles.question}>표지URL : </Text>
            <TextInput
              style={styles.showTextInput}
              placeholder="입력된 정보가 없습니다"
              editable={false}
            // image picker 사용법 알아봅시다
            >
              {imageSrc}
            </TextInput>
          </View>
          <View style={styles.bookInput}>
            <Text style={styles.question}>제목 : </Text>
            <TextInput
              multiline
              style={styles.showTextInput}
              placeholder="입력된 정보가 없습니다"
              editable={false}
            >
              {title}
            </TextInput>
          </View>
          <View style={styles.bookInput}>
            <Text style={styles.question}>저자 : </Text>
            <TextInput
              style={styles.showTextInput}
              placeholder="입력된 정보가 없습니다"
              editable={false}
            >
              {author}
            </TextInput>
          </View>
          <View style={styles.bookInput}>
            <Text style={styles.question}>출판연도 : </Text>
            <TextInput
              style={styles.showTextInput}
              placeholder="입력된 정보가 없습니다"
              editable={false}
            >
              {pubYear}
            </TextInput>
          </View>
          <View style={styles.bookInput}>
            <Text style={styles.question}>줄거리 요약 : </Text>
            <TextInput
              multiline
              style={styles.showTextInput}
              placeholder="입력된 정보가 없습니다"
              editable={false}
            >
              {desc}
            </TextInput>
          </View>
        </TouchableOpacity>
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
          <View style={styles.modalBackground}>
            <View style={styles.postBox}>
              <View style={styles.bookInput}>
                <Text style={styles.question}>표지URL : </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setImageSrc}
                  value={imageSrc}
                  placeholder="|"
                // image picker 사용법 알아봅시다
                />
              </View>
              <View style={styles.bookInput}>
                <Text style={styles.question}>제목 : </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setTitle}
                  value={title}
                  placeholder="제목을 입력해주세요"
                />
              </View>
              <View style={styles.bookInput}>
                <Text style={styles.question}>저자 : </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setAuthor}
                  value={author}
                  placeholder="저자를 입력해주세요"
                />
              </View>
              <View style={styles.bookInput}>
                <Text style={styles.question}>출판연도 : </Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setPubYear}
                  value={pubYear}
                  placeholder="출판연도를 입력해주세요"
                />
              </View>
              <View style={styles.bookInput}>
                <Text style={styles.question}>줄거리 요약 : </Text>
                <TextInput
                  multiline
                  numberOfLines={6}
                  scrollEnabled
                  style={styles.textInput}
                  onChangeText={setDesc}
                  value={desc}
                  placeholder="줄거리를 입력해주세요"
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
          </View>
        </Modal>
        
        <View style={styles.yours}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.head}>🔥 읽고 싶은 이유?</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => {
              //navigation.navigate('Editor')
              return (<Editor descHTML={descHTML} setDescHTML={setDescHTML} navigation={navigation} />)
            }}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.desc}>
            {!descHTML && (<TextInput
              editable={false}
              placeholder="내용을 입력해주세요">
            </TextInput>
            )}
            {/* <WebView
              originWhitelist={['*']}
              source={{ html: descHTML }}
            /> */}
            <View>
              {/* <RenderHtml contentWidth={width} source={descHTML}/> */}
              <HTML source={{html:descHTML}} contentWidth={250}/>
            </View>
          </View>          
        </View>
        <TouchableOpacity style={styles.button} onPress={() => save()}><Text style={styles.buttonText}>Add</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:"white"
  },
  head: {
    fontSize: 20,
    fontWeight: "700",
  },
  addBook:
  {
    flex:1,
  },
  addButton: {
    width: "100%",
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    padding: 5,
    borderRadius: 7,
    backgroundColor: 'black',
    justifyContent:'center',
    alignSelf:'center'
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  warning: {
    color:'red'
  },
  showPost: {
    width:"100%",
    marginTop:30,
    marginBottom: 60,
    padding:10,
    paddingTop:20,
    borderRadius: 10,
    backgroundColor:"#eee",
  },
  modalBackground:{
    width:"100%",
    height:"100%",
    backgroundColor:"rgba(0,0,0,0.5)",
    flexDirection:'column',
    justifyContent:'center',
    padding:25
  },
  postBox: {
    width:"100%",
    maxHeight:400,
    alignSelf:'center',
    marginTop:30,
    marginBottom: 10,
    padding:10,
    paddingTop:20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor:"#eee",
  },
  bookInput:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom:10,
    justifyContent: 'flex-start',
  },
  question: {
    fontSize: 17,
    fontWeight: "500",
    alignSelf:'flex-start',
    marginTop:5,
  },
  showTextInput:{
    flex:1,
    alignSelf:'flex-start',
    paddingHorizontal: 10,
    minHeight: 30,
    borderRadius: 5,
    borderColor: '#A6A6A6',
    //borderWidth: 1,
    marginLeft:5
  },
  textInput: {
    flex:1,
    alignSelf:'flex-start',
    paddingHorizontal: 20,
    minHeight: 35,
    maxHeight: 180,
    borderRadius: 5,
    borderColor: '#A6A6A6',
    borderWidth: 1,
    backgroundColor:"#fff",
    marginLeft:5
  },
  editButton:{
    width:50,
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
  desc: {
    minHeight: 200,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginTop:10,
    marginBottom: 10,
    padding:15,
    paddingBottom: 30,
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
  
});
