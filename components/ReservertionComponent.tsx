import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'

class Reservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Reserve Table',
    };

    toggelModal(){
        this.setState({showModal:!this.state.showModal});
    }

    handleReservation() {
        const reservation='Your Reservation \n';
        const guests = 'Number of Guests '+this.state.guests+' \n ';
        let smoking = 'Smoking ';
        if(this.state.smoking){smoking = 'Smoking : YES \n'; }else{smoking = 'Smoking : NO \n'; }
        const date ='Date and Time: ' +this.state.date+' \n';
         Alert.alert(reservation+guests+smoking+date);
      //  console.log('JSON --> ',JSON.stringify(this.state));
        //this.toggelModal();
    }
    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }
    
    render() {
        return(
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <DatePicker
                    style={{flex: 2, marginRight: 20}}
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="select date and Time"
                    minDate="2017-01-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                    
                </View>
                    <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={()=>{this.toggelModal(); this.resetForm()}}
                    onRequestClose={()=>{this.toggelModal(); this.resetForm()}}
                    >
                <View style={styles.modal}>
                <Text style={styles.modalTitle} >Your Reservation</Text>
                <Text style={styles.modalText}>Number of Guests : {this.state.guests}</Text>
                <Text style={styles.modalText}>Smoking ? : {this.state.smoking ? "Yes": "NO"}</Text>
                <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                <Button 
                title= "Close"
                onPress={()=>{this.toggelModal(); this.resetForm()}} 
                color ='#512DA8'
                />
                        </View>
                    </Modal>

            </ScrollView>
        );
    }

};

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
    modal : {
        justifyContent:'center',
        margin :20,
    },
    modalTitle : {
        fontSize:24,
        fontWeight:'bold',
        backgroundColor:'#512DA8',
        textAlign:'center',
        color:'white',
        marginBottom:20,
    },
    modalText : {
        fontSize:18,
        margin:10,
    }
});

export default Reservation;