import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import MainPage from '../pages/MainPage';
import AddPage from '../pages/AddPage';
import SearchPage from '../pages/SearchPage';
import IngDetailPage from '../pages/IngDetailPage';
import DoneDetailPage from '../pages/DoneDetailPage';
// import Editor from '../components/Editor';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        //컴포넌트들을 페이지처럼 여기게끔 해주는 기능을 하는 네비게이터 태그를 선언합니다.
        //위에서 선언한 const Stack = createStackNavigator(); Stack 변수에 들어있는 태그를 꺼내 사용합니다.
        //Stack.Navigator 태그 내부엔 페이지(화면)를 스타일링 할 수 있는 다양한 옵션들이 담겨 있습니다.
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "black",
                    borderBottomColor: "black",
                    shadowColor: "black",
                    height: 100
                },
                headerTitleAlign: 'left',
                headerTintColor: "#FFFFFF",
                headerBackTitleVisible: false
            }}

        >

            {/* 컴포넌트를 페이지로 만들어주는 엘리먼트에 끼워 넣습니다. 이 자체로 이제 페이지 기능을 합니다*/}
            <Stack.Screen name="SignInPage" component={SignInPage} options={{gestureEnabled: false}}/>
            <Stack.Screen name="SignUpPage" component={SignUpPage}/>
            <Stack.Screen name="MainPage" component={MainPage} />
            <Stack.Screen name="AddPage" component={AddPage}/>
            <Stack.Screen name="SearchPage" component={SearchPage}/>
            <Stack.Screen name="IngDetailPage" component={IngDetailPage}/>
            <Stack.Screen name="DoneDetailPage" component={DoneDetailPage}/>
            {/* <Stack.Screen name="Editor" component={Editor}/> */}
        </Stack.Navigator>
    )
}

export default StackNavigator;