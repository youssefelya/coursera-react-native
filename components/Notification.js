import React from 'react';
import {Text, Button, View} from 'react-native';
import {Permissions, Notifications} from 'expo';
import {Alert} from "react-native-web";


export default class Notofication extends React.Component{ 
    async obtainNotificationPermission(){
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
         if(permission.status != 'granted'){
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if(permission.status != 'granted'){
         Alert.alert('Permission not granted to show notification');
     }
 }
 return permission;
}

async presentLocalNotification(date){
   await this.obtainNotificationPermission() ;
   Notifications.presentLocalNotificationAsync({
       title: 'Your Reservation',
       body : 'Reservation for '+date+' requested',
       ios : {
           sound: true
       },
    //    android: {
    //        sound: true,
    //        vibrate : true,
    //        color : '#512DA8'
    //    }
   })
}

sabmitButton=()=>{
    Alert.alert('You click it on the button Great:::::: ');
    this.presentLocalNotification(new Date())
}

    render(){
    return(
        <View>
            <Text>Ther is button here !! </Text>
            <Button  title = 'Submit' onPress ={this.sabmitButton} />
        </View>
    );
}

}

 