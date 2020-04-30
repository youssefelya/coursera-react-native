import React from 'react';
import { View, Text, FlatList, ScrollView , StyleSheet, Modal, Button,TextInput} from 'react-native';
import { Card, Icon, Rating, AirbnbRating, Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';
import {postComment } from '../redux/ActionCreators';
//https://github.com/axingjia/coursera-react-native/blob/master/components/DishdetailComponent.js
const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment :(dishId, rating, author,comment) =>dispatch(postComment(dishId, rating, author,comment))
    
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
                <View style={{flexDirection:'row', margin:10,justifyContent:'center'}}>
                <Icon 
                   raised 
                   reverse 
                   name={props.favorite ? 'heart' : 'heart-o'}
                   type='font-awesome'
                   color='#f50'
                   onPress = {()=>props.favorite ? console.log('Already favorite ') : props.onPress()}
                   />
                   <Icon 
                   raised 
                   reverse 
                   name={props.favorite ? 'pencil' : 'pencil'}
                   type='font-awesome'
                   color='#12E'
                   onPress = {()=> props.onPressAddComment()}
                   />
                   </View>
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
            comment:"",
            commentFormModal:false,
            ratingCount:5,
            selectedDish : '',
		};
    }
    toggleCommentFormModal(){
        this.setState({commentFormModal: !this.state.commentFormModal});
   
    }
    resetForm(){}
    submitComment(dishId){
      this.props.postComment(dishId, this.state.ratingCount, this.state.author, this.state.comment);
      this.setState({commentFormModal:false})
    }
 
    markFavorite(dishId){
        this.setState({favorites : this.state.favorites.concat(dishId)});
        //this.props.postFavorite(dishId)
    }
    postComment(dishId, rating, author,comment){
        this.props.postComment(dishId, rating, author,comment);
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
                onPress = {() =>this.markFavorite(dishId)}
                onPressAddComment= {()=>{this.toggleCommentFormModal()} }
                 />

                 <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.commentFormModal}
                    onDismiss = {() => {}}
                    onRequestClose = {() =>{} }
                    >
                    <View style = {styles.modal}>

                    <Rating
                    showRating
                    ratingCount={5}
                    onFinishRating={(rating)=>{this.setState({ratingCount:rating})}}
                    //style={{ paddingVertical: 10 }}
                    />
            
                    <Input
                        placeholder="Author"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        style={styles}
                        onChangeText={author => this.setState({ author: author })}
                        />
                    <Input
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment-o' }}
                        style={styles.input}
                        multiline={true}
                        numberOfLines={4}
                        //maxLength={50000}
                        onChangeText={comment => this.setState({ comment:comment })}
                        />      
                   <View >
                <Button
                    onPress={() => {this.submitComment(dishId) }}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                        <View style={{margin:10}}></View>
                        <Button 
                            onPress = {() =>{this.setState({commentFormModal:false}) }}
                            color="#512DA8"
                            title="Close" 
                            />
                            </View>
                    </View>
               
                </Modal>


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
      },
      button: {
        backgroundColor: 'green',
        width: '40%',
        height: 40
      },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);