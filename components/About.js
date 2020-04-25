import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import { Card } from 'react-native-elements';
import * as history from './OurHistory/History';

const {height, width} = Dimensions.get('window');
export default class About extends React.Component{

    static navigationOptions = {
		title: 'About Us',
    };
    render(){
        return(
            <View style={{flex:1, justifyContent:'space-around'}}> 
             <View style={{height:'50%'}}>
            <Card 
            title="Our History"
            
            >
            <View style={{  justifyContent:'flex-start'}}>
            <Text >{ history.RestaurantHistory}</Text>
            <Text  >{ history.RestaurantTreace}</Text>
            </View>
            </Card>
            </View>
            <View style={{height : '48%'}}>
            { <Card 
            title="Our History"
            >
            <Text style ={styles.text}>{ history.RestaurantHistory}</Text>
            <Text style ={styles.text}>{ history.RestaurantTreace}</Text>
            </Card> }
            </View>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    text : {
        margin:30,
       
    }
})