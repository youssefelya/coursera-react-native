import React from 'react';
import { View, Text, FlatList, ScrollView , StyleSheet} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
//https://github.com/axingjia/coursera-react-native/blob/master/components/DishdetailComponent.js
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

function RenderDish(props) {
	const dish = props.dish;
	if (dish != null) {
		return (
			<Card
				featuredTitle={dish.name}
				// @ts-ignore
				image={{uri : baseUrl+dish.image}}
			>
				<Text style={{ margin: 10 }}>{dish.description}</Text>
                <Icon 
                   raised 
                   reverse 
                   name={props.favorite ? 'heart' : 'heart-o'}
                   type='font-awesome'
                   color='#f50'
                   onPress = {()=>props.favorite ? console.log('Already favorite ') : props.onPress()}
                   />
			</Card>
		);
	} else {
		return <View></View>;
	}
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class Dishdetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            favorites : [],
            author:"",
            rating:0,
            comment:"",
            commentFormModal:false
		};
    }
    toggleCommentFormModal(){
        this.setState({commentFormModal: !this.state.commentFormModal});
    }
    submitForm(dishId,rating,author,comment){
        // this.props.postComment(dishId);
        // this.props.postComment(dishId, rating, author, comment);
        this.props.postComment(dishId, rating, author, comment);
    }
    markFavorite(dishId){
        this.setState({favorites : this.state.favorites.concat(dishId)});
    }
	static navigationOptions = {
		title: 'Dish Details',
	};

	render() {
        const dishId = this.props.navigation.getParam('dishId', '');
		return (
			<ScrollView>
				<RenderDish dish={this.props.dishes.dishes[+dishId]}
                favorite = {this.state.favorites.some(el => el === dishId)}
                onPress = {() =>this.markFavorite(dishId )}
                 />
                 <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
      },
      formLabel: {
          fontSize: 18,
          flex: 2
      },
      formItem: {
          flex: 1
      },
      modal: {
         justifyContent: 'center',
         margin: 20
      },
      modalTitle: {
          fontSize: 24,
          fontWeight: 'bold',
          backgroundColor: '#512DA8',
          textAlign: 'center',
          color: 'white',
          marginBottom: 20
      },
      modalText: {
          fontSize: 18,
          margin: 10
      }
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);