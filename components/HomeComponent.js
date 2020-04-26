import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';


const mapStateToProps = state => {
    return {
      dishes: state.dishes,
	  promotions : state.promotions,
	  leaders : state.leaders,
    }
  }
  

function RenderItem(props) {
	const item = props.item;
	if (item != null) {
		return (
			<Card
				featuredTitle={item.name}
				featuredSubtitle={item.designation}
				// @ts-ignore
				image={{uri : baseUrl+item.image}}
			>
				<Text style={{ margin: 10 }}>{item.decription}</Text>
			</Card>
		);
	} else {
		return <View></View>;
	}
}

class Home extends React.Component {
	static navigationOptions = {
		title: 'Home',
	};
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
			promotions: PROMOTIONS,
			leaders: LEADERS,
		};
	}
	render() {
		return (
			<ScrollView>
				<RenderItem
					item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
				></RenderItem>
                <RenderItem
					item={this.props.promotions.promotions.filter((dish) => dish.featured)[0]}
				></RenderItem>

                <RenderItem
					item={this.props.leaders.leaders.filter((dish) => dish.featured)[0]}
				></RenderItem>
               
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps)(Home);
