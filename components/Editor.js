import { useRef, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal} from "react-native";
import { actions, RichEditor, RichToolbar,} from "react-native-pell-rich-editor";
import * as ImagePicker from 'expo-image-picker';

export default function Editor({descHTML, setDescHTML, navigation}) {
    const richText = useRef();

    const [modalVisible, setModalVisible] = useState(true);

    const [image,setImage] = useState(null)
    const [showDescError, setShowDescError] = useState(false);

    const checkRichText = (descriptionText) => {
      if (descriptionText) {
        setShowDescError(false);
        setDescHTML(descriptionText);
      } else {
        setShowDescError(true);
        setDescHTML("");
      }
    };

    const onPressAddImage = async() => {
      // 이미지 로컬에서 불러오기
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        setImage(result.uri);
      }
      richText.current?.insertImage(result.uri);
      // 이미지 미리보기
    }
    const onInsertLink =() => {
      // 링크 미리보기 기능 추가 (ex 유튜브)
    }
    // const insertVideo =() => {
    //   richText.current?.insertVideo(
    //     "https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4"
    //   );
    //   //삭제하기 기능 추가
    // }

  return (
    <View>
    <Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={() => { setModalVisible(!modalVisible) }}>
      <View style={styles.postBox}>
        <View style={styles.richTextContainer}>
          <ScrollView
            nestedScrollEnabled={true}
            style={{ width: "100%", height: 500, }}>
            <RichEditor
              style={styles.richTextEditorStyle}
              ref={richText}
              initialContentHTML={descHTML}
              onChange={checkRichText}
              placeholder="내용을 입력해주세요"
              androidHardwareAccelerationDisabled={true}
              initialHeight={300}
            />
            {showDescError && (
              <Text style={styles.errorTextStyle}>
                정말 빈칸으로 남겨두실 건가요?
              </Text>
            )}
          </ScrollView>
          <RichToolbar
            style={styles.richTextToolbarStyle}
            editor={richText}
            selectedIconTint="#2295f2"
            iconTint="#787878"
            actions={[
              actions.keyboard,
              actions.undo,
              actions.redo,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.code,
              actions.line,
              actions.fontSize,
              actions.setTextColor,
              actions.setBackgroundColor,
              actions.blockquote,
              actions.alignLeft,
              actions.alignCenter,
              actions.alignRight,
              actions.insertLink,
              actions.insertImage,
              //actions.insertVideo,
              //actions.checkboxList,
            ]}
            onPressAddImage={onPressAddImage}
            //insertVideo={insertVideo}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(false)}}><Text style={styles.buttonText}>Close</Text></TouchableOpacity>
      </View>
    </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  postBox: {
    backgroundColor:'#eee',
    width:"100%",
    height:"100%",
    alignSelf:'center',
    padding:10,
    paddingTop:40,
  },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },
  richTextEditorStyle: {
    borderWidth: 1,
    borderColor: "#d7d7d7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },
  richTextToolbarStyle: {
    backgroundColor: "#f0f0f0",
    borderColor: "#d7d7d7",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    marginTop:20,
  },
  errorTextStyle: {
    color: "#FF0000",
    marginTop:10,
    marginBottom: 10,
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