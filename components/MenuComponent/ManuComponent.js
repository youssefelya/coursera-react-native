import React from 'react';
import { FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {DISHES} from '../../shared/dishes';

import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }
class Menu extends React.Component{

constructor(props){
    super(props);
    this.state={
        dishes: DISHES,
    }
}
    static navigationOptions= {
      title: 'Menu'  
    }

    render(){
        const renderMenuItem = ({item, index})=>{
            return(
               <Tile
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    imageSrc={{ uri: baseUrl + item.image}}
                    />
            );
        }
        const {navigate} = this.props.navigation;
        if (this.props.dishes.isLoading) {
          return(
              <Loading />
          );
      }
      else if (this.props.dishes.errMess) {
          return(
              <View>            
                  <Text>{props.dishes.errMess}</Text>
              </View>            
          );
      }
      else {
          return (
              <FlatList 
                  data={this.props.dishes.dishes}
                  renderItem={renderMenuItem}
                  keyExtractor={item => item.id.toString()}
                  />
          );
      }
    }
}

export default connect(mapStateToProps)(Menu);