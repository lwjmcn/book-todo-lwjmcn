// import React from 'react'
// import Loading from './components/Loading';
// import MainPage from './pages/MainPage';
// import AddPage from './pages/AddPage';
// import IngDetailPage from './pages/IngDetailPage';
// import DoneDetailPage from './pages/DoneDetailPage';
// import SearchPage from './pages/SearchPage';
// import Editor from './components/Editor';
// import SignInPage from './pages/SignInPage';
// import SignUpPage from './pages/SignUpPage';

// export default function App(){
//   return (<SignUpPage/>)
// }

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="black" />
      <StackNavigator />
    </NavigationContainer>);
  //이제 StackNavigator.js 파일에서 페이지화 진행하면 됨
}
