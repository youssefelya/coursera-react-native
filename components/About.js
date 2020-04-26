import React from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, ScrollView} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import * as history from './OurHistory/History';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const {height, width} = Dimensions.get('window');

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }
  
  function History(){
    
  }
class About extends React.Component{

    static navigationOptions = {
		title: 'About Us',
    };
    render(){
      const {param } = this.props.navigation.state;
      const renderLeader = ({item, index}) =>{
        return(
          <ListItem 
           roundAvatar 
           key = {index}
           title = {item.name}
           subtitle = {item.description}
           hideChevron = {true}
           // @ts-ignore
           leftAvatar = {{source : {uri : baseUrl+item.image}}}
           />
        );
      }
        return(
            <ScrollView>
           
            <Card 
            title="Our History"
            >
            <View style={{  justifyContent:'flex-start'}}>
            <Text style = {{margin : 10}}>{ history.RestaurantHistory}</Text>
            </View>
            </Card>
            <Card 
            title ='Corporate Leadership'>
            <FlatList
            data = {this.props.leaders.leaders}
            renderItem = {renderLeader}
            keyExtractor = {item=>item.id.toString()}
             />
            </Card>
          
            </ScrollView>
            
            
        )
    }
}
const styles = StyleSheet.create({
    text : {
        margin:30,
       
    }
});

export default connect(mapStateToProps)(About);