import React from 'react';
import { StyleSheet, View} from 'react-native';
import Main from './components/MainComponent';
import Contact from './components/Contact';
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';


const store = configureStore();

export default class App extends React.Component{

  render(){
    return (
      <Provider 
// @ts-ignore
      store={store}>
      <Main   />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({

});
