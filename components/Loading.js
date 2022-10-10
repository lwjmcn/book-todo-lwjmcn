import React from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';

export default function Loading(){
    return(
    <View style={styles.container}>
        <Image style={styles.loadingImage} source={{ uri: "https://firebasestorage.googleapis.com/v0/b/book-todo-lwjmcn.appspot.com/o/images%2Floading.png?alt=media&token=edb0bfdc-6e14-4895-875e-768bab0502d7" }} />
        <Text style={styles.title}>Please wait...</Text>
    </View>)
}


const styles = StyleSheet.create({
    container: {
        //앱의 배경 색
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#F2F2F2',
    },
    loadingImage: {
        width: 200,
        height: 60,
        alignSelf: "center"
    },
    title: {
        marginTop: 20,
        fontSize:20
    }

})