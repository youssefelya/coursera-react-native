import React from 'react';
import Menu from './MenuComponent/ManuComponent';
import {
	View,
	Text,
	Platform,
	Image,
	StyleSheet,
	ScrollView,
} from 'react-native';
import Dishdetail from './DishedetailComponent';
import {
	createStackNavigator,
	createDrawerNavigator,
	DrawerItems,
	SafeAreaView,
} from 'react-navigation';
import Home from './HomeComponent';
import Contact from './Contact';
import About from './About';
import Favorites from './FavoritesComponents';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import {
	fetchDishes,
	fetchComments,
	fetchPromos,
	fetchLeaders,
} from '../redux/ActionCreators';
import Reservation from './ReservertionComponent';
import Login from './LoginComponent';

const mapStateToProps = (state) => {
	return {
		dishes: state.dishes,
		comments: state.comments,
		promotions: state.promotions,
		leaders: state.leaders,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchDishes: () => dispatch(fetchDishes()),
	fetchComments: () => dispatch(fetchComments()),
	fetchPromos: () => dispatch(fetchPromos()),
	fetchLeaders: () => dispatch(fetchLeaders()),
});

const LoginNavigator = createStackNavigator(
	{
		Login: { screen: Login },
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTitleStyle: {
				color: '#fff',
			},
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					iconStyle={{ color: 'white' }}
					onPress={() => navigation.toggleDrawer()}
				/>
			),
		}),
	}
);

const MenuNavigator = createStackNavigator(
	{
		Menu: {
			screen: Menu,
			navigationOptions: ({ navigation }) => ({
				headerLeft: (
					<Icon
						name='menu'
						size={24}
						color='white'
						onPress={() => {
							navigation.toggleDrawer();
						}}
					/>
				),
			}),
		},
		Dishdetail: { screen: Dishdetail },
	},
	{
		initialRouteName: 'Menu',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
		},
	}
);

const HomeNavigator = createStackNavigator(
	{
		Home: { screen: Home },
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					color='white'
					onPress={() => {
						navigation.toggleDrawer();
					}}
				/>
			),
		}),
	}
);

const ReservationNavigator = createStackNavigator(
	{
		Reservation: { screen: Reservation },
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					color='white'
					onPress={() => {
						navigation.toggleDrawer();
					}}
				/>
			),
		}),
	}
);

const ContactNavigator = createStackNavigator(
	{
		Contact: { screen: Contact },
		// Dishdetail: { screen: Dishdetail }
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					color='white'
					onPress={() => {
						navigation.toggleDrawer();
					}}
				/>
			),
		}),
	}
);

const FavoritesNavigator = createStackNavigator(
	{
		Favorites: { screen: Favorites },
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTitleStyle: {
				color: '#fff',
			},
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					iconStyle={{ color: 'white' }}
					onPress={() => navigation.navigate('DrawerToggle')}
				/>
			),
		}),
	}
);

const AboutUstNavigator = createStackNavigator(
	{
		About: { screen: About },
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: '#512DA8',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				color: '#fff',
			},
			headerLeft: (
				<Icon
					name='menu'
					size={24}
					color='white'
					onPress={() => {
						navigation.toggleDrawer();
					}}
				/>
			),
		}),
	}
);

const CustomDrawerContentComponent = (props) => (
	<ScrollView>
		<SafeAreaView
			style={styles.container}
			forceInset={{ top: 'always', horizontal: 'never' }}
		>
			<View style={styles.drawerHeader}>
				<View style={{ flex: 1 }}>
					<Image
						// @ts-ignore
						source={require('./images/logo.png')}
						style={styles.drawerImage}
					/>
				</View>
				<View style={{ flex: 2 }}>
					<Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
				</View>
			</View>
			<DrawerItems {...props} />
		</SafeAreaView>
	</ScrollView>
);

const MainNavigator = createDrawerNavigator(
	{
		Login: {
			screen: LoginNavigator,
			navigationOptions: {
				title: 'Login',
				drawerLabel: 'Login',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon
						name='sign-in'
						type='font-awesome'
						size={24}
						iconStyle={{ color: tintColor }}
					/>
				),
			},
		},
		Home: {
			screen: HomeNavigator,
			navigationOptions: {
				title: 'Home',
				drawerLable: 'Home',
				drawerIcon: ({ tintColor }) => (
					<Icon name='home' type='font-awesome' size={24} color={tintColor} />
				),
			},
		},
		About: {
			screen: AboutUstNavigator,
			navigationOptions: {
				title: 'About Us',
				drawerLable: 'About Us',
				drawerIcon: ({ tintColor }) => (
					<Icon
						name='info-circle'
						type='font-awesome'
						size={24}
						color={tintColor}
					/>
				),
			},
		},
		Menu: {
			screen: MenuNavigator,
			navigationOptions: {
				title: 'Menu',
				drawerLable: 'Menu',
				drawerIcon: ({ tintColor }) => (
					<Icon name='list' type='font-awesome' size={24} color={tintColor} />
				),
			},
		},
		Contact: {
			screen: ContactNavigator,
			navigationOptions: {
				title: 'Contact Us',
				drawerLable: 'Contact',
				drawerIcon: ({ tintColor }) => (
					<Icon
						name='address-card'
						type='font-awesome'
						size={22}
						color={tintColor}
					/>
				),
			},
		},
		Favorites: {
			screen: FavoritesNavigator,
			navigationOptions: {
				title: 'My Favorites',
				drawerLabel: 'My Favorites',
				drawerIcon: ({ tintColor, focused }) => (
					<Icon
						name='heart'
						type='font-awesome'
						size={24}
						iconStyle={{ color: tintColor }}
					/>
				),
			},
		},
		Reservation: {
			screen: ReservationNavigator,
			navigationOptions: {
				title: 'Reserve Table',
				drawerLable: 'Reserve Table',
				drawerIcon: ({ tintColor }) => (
					<Icon
						name='cutlery'
						type='font-awesome'
						size={22}
						color={tintColor}
					/>
				),
			},
		},
	},
	{
		initialRouteName: 'Home',
		drawerBackgroundColor: '#D1C4E9',
		contentComponent: CustomDrawerContentComponent,
	}
);

class Main extends React.Component {
	componentDidMount() {
		this.props.fetchDishes();
		this.props.fetchComments();
		this.props.fetchPromos();
		this.props.fetchLeaders();
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop:
						Platform.OS === 'ios'
							? 0
							: // @ts-ignore
							  Expo.Constants.statusBarHeight,
				}}
			>
				<MainNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	drawerHeader: {
		backgroundColor: '#512DA8',
		height: 140,
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	drawerImage: {
		margin: 10,
		width: 80,
		height: 60,
	},
	drawerHeaderText: {
		color: 'white',
		fontSize: 24,
		fontWeight: 'bold',
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
