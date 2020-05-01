import React from 'react';
import { FlatList, View, Text} from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../../shared/dishes';

import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../../shared/baseUrl';
import { Loading } from '../LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
	};
};
class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dishes: DISHES,
		};
	}
	static navigationOptions = {
		title: 'Menu',
	};

	render() {
		const renderMenuItem = ({ item, index }) => {
			return (
				<Tile
					key={index}
					title={item.name}
					caption={item.description}
					featured
					onPress={() => navigate('Dishdetail', { dishId: item.id })}
					imageSrc={{ uri: baseUrl + item.image }}
				/>
			);
		};
		const { navigate } = this.props.navigation;
		if (this.props.dishes.isLoading) {
			return <Loading />;
		} else if (this.props.dishes.errMess) {
			return (
				<View>
					<Text>{this.props.dishes.errMess}</Text>
				</View>
			);
		} else {
			return (
				<Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
					<FlatList
						data={this.props.dishes.dishes}
						renderItem={renderMenuItem}
						keyExtractor={(item) => item.id.toString()}
					/>
				</Animatable.View>
			);
		}
	}
}

export default connect(mapStateToProps)(Menu);
