import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import getActions from '../utils/getActions'
import { Text, View } from '../components/Themed';

export default function TabThreeScreen() {
  const [actions, setActionsList] =useState([])
  const [email, setEmail] = useState("")
  const [password, setPasswd] = useState("")

  const onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+ viewId);
  }
  useEffect(() => {
    fetch('http://localhost:3000/api/playing/') 
    .then((response) => response.json())
    .then((responseJson) => setActionsList(Object.values(responseJson)))
     .catch((error) => console.error('error in catch ----------',error))
    }, [])

  console.log('actions :>> ', actions);
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/50/000000/no-message.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => setEmail({email: String})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/fluent-systems-regular/24/000000/forgot-password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPasswd({password: String})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});
