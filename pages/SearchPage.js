import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Icon from 'react-native-vector-icons'; //link가 필요한듯...

import Loading from '../components/Loading'
import Book from '../components/Book';

export default function SearchPage({navigation,route}) {
    const [state,setState] = useState([])
    const [ready,setReady] = useState(true)

    const [book,setBook] = useState([])
    const [text,setText] = useState('')

    useEffect(()=>{
        navigation.setOptions({
          title:'Search',
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "#fff"
          }
        })
        setTimeout(()=>{
            setReady(false)
        },1000)
    },[])

    const getBooks = async (token) => {
        try {
        const ID_KEY = "6R8sk28wu67j5W9FSCbc";
        const SECRET_KEY = "7_lplNe0Cv";
        const result = await axios.get(
            `https://openapi.naver.com/v1/search/book.json`, {
                params:{
                    query: token,
                    display:100
                },
                headers: {
                    'X-Naver-Client-Id': ID_KEY,
                    'X-Naver-Client-Secret': SECRET_KEY
                }
            }
        );

        const temp = result.data.items;
        //console.log(temp[0].title);
        //author, description, image, link, pubdate, publisher, title
        setBook(temp)
        } catch (error) {
            console.log("error")
            Alert.alert("error");
        }
    }

return ready ? <Loading/> :  (
    <ScrollView style={styles.container}>
      <StatusBar style="light"/>
        <View style={styles.searching}>
          {/* <Icon name="search" size={20} color="gray"/> */}
          <TextInput
            style={styles.textInput}
            onChangeText={setText}            
            value={text}
            placeholder="도서명, 저자명으로 검색해보세요"
          />
          <TouchableOpacity onPress={()=>getBooks(text)} style={styles.button}><Image style={styles.buttonImage} source={{uri:"https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fsearch-white.png?alt=media&token=338610a6-b60e-49e3-973d-4ebdd5ba44d1"}}/></TouchableOpacity>
        </View>
      <ScrollView style={styles.cardContainer}>
        {book.length==0 && (
          <View>
            <Image style={styles.stateImage} resize='cover' source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Fnodata.png?alt=media&token=4cd52398-6bb0-45bb-bcae-29b012071e17" }} />
            <Text style={styles.head}>검색 결과가 없습니다.</Text>
            <Text style={styles.desc}>다른 검색어를 입력해 보시기 바랍니다.</Text>
            <Text></Text>
            <Text style={styles.desc}>검색어의 철자가 정확한지 확인해 보시기 바랍니다.</Text>
            <Text style={styles.desc}>일시적으로 품절되거나 노출이 제한된 도서일 수 있습니다.</Text>
          </View>
        )}
        {
          book.map((content, i) => {
            return (<Book content={content} key={i} navigation={navigation} />)
          })
        }
      </ScrollView>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searching:{
    flexDirection:'row',
    padding: 25,
    paddingTop:20,
    paddingBottom:20,
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor:'black'
  },
  textInput: {
    paddingHorizontal: 20,
    width:"90%",
    height: 50,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor:"#fff"
  },
  button:{
    height:50,
    width:50,
    justifyContent:'center',
    marginLeft:10
  },
  buttonImage:{
    width:30,
    height:30,
  },
  cardContainer: {
    marginTop:10,
    marginLeft:10
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