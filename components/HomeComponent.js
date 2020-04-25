import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

function RenderItem(props) {
	const item = props.item;
	if (item != null) {
		return (
			<Card
				featuredTitle={item.name}
				featuredSubtitle={item.designation}
				// @ts-ignore
				image={require('./images/uthappizza.png')}
			>
				<Text style={{ margin: 10 }}>{item.decription}</Text>
			</Card>
		);
	} else {
		return <View> </View>;
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
			leader: LEADERS,
		};
	}
	render() {
		return (
			<ScrollView>
				<RenderItem
					item={this.state.dishes.filter((dish) => dish.featured)[0]}
				></RenderItem>
                <RenderItem
					item={this.state.promotions.filter((dish) => dish.featured)[0]}
				></RenderItem>

                <RenderItem
					item={this.state.leader.filter((dish) => dish.featured)[0]}
				></RenderItem>
               
			</ScrollView>
		);
	}
}

export default Home;
