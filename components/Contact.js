import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Card , Button, Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


class Contact extends React.Component {
	static navigationOptions = {
		title: 'Contact',
	};
	sendMail() {
        MailComposer.composeAsync({
            recipients: ['youssefkiraelya@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
	render() {
		return (
			<ScrollView>
				<Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
					<Card title='Contact Information'>
						<View>
							<Text style={styles.text}>121, Creal Water Bay Road</Text>
							<Text style={styles.text}>Clear Water Bay, Knowloon</Text>
							<Text style={styles.text}>HONG KONG</Text>
							<Text style={styles.text}>Tel : +85273829384</Text>
							<Text style={styles.text}>Fax : +86739238</Text>
							<Text style={styles.text}>Email : confusion@food.net</Text>
							<Button 
							title ='Send Email'
							buttonStyle ={{ backgroundColor :'#512DA8'}}
							icon={<Icon name ='envelope-o' type ='font-awesome' color='white' />}
							onPress ={this.sendMail }
							/>
						</View>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}
const styles = StyleSheet.create({
	text: {
		margin: 10,
	},
});

export default Contact;
