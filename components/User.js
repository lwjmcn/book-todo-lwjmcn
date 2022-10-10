import React from 'react';
import { Platform } from 'react-native';
import * as Application from 'expo-application';
const isIOS = Platform.OS === 'ios';

let userUniqueId ='';
const User = async() => {
    if (isIOS) {
        let iosId = await Application.getIosIdForVendorAsync();
        userUniqueId = iosId;
    } else {
        userUniqueId = await Application.androidId;
    }
    //console.log(userUniqueId)

}
User()
export {userUniqueId};
export default User;