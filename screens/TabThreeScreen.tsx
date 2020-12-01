import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableHighlight, Image, TextInput } from 'react-native';
import getActions from '../utils/getActions'
import { Text, View } from '../components/Themed';
import axios from 'axios';

export default function TabThreeScreen() {
  // const [actions, setActionsList] =useState([])
  const [email, setEmail] = useState("")
  const [password, setPasswd] = useState("")

  const onClickListener = (viewId: any) => {
    Alert.alert("Alert", "Button pressed "+ viewId);
  }
  const login = async () => {
    let response = axios.post('http://localhost:3000/api/users/login', 
      {
        "user": {
        
            "email": email,
            "password":password
        }
      }
    )
    .then( (res: any)=>{
     
      // const token = AsyncStorage.getItem('token');
      let token = res.data.user.token;
      _storeData(token);
     
    })
    .catch((error:any) => console.error('7777777777777777777', error))

  }
  const _storeData = async (token: string) => {
    try {
      await AsyncStorage.setItem(
        'token',
        token
      );
    } catch (error) {
      // Error saving data
      console.error('Error local storage ', error);
    }
  }
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // We have data!!
        console.log('We have data in storage!!',value);
      }
    } catch (error) {
      // Error retrieving data
      console.log("erreur recup token storage")
    }
  };
  useEffect(() => {
    // 2 - je recupere le token(getItem) actuel pour savoir si je suis connecté ou pas
    // 2.1 si je suis connectée je vais aller à la page home
    // 2.2 rester sur page login
    console.log("ici useeffect")
    let token = _retrieveData();
    console.log("Token in useeffect", token)

    // fetch('http://localhost:3000/api/playing/') 
    // .then((response) => response.json())
    // .then((responseJson) => setActionsList(Object.values(responseJson)))
    //  .catch((error) => console.error('error in catch ----------',error))
    }, [])



  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ios/50/000000/no-message.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email: string) => setEmail(email)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/fluent-systems-regular/24/000000/forgot-password.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password : string) => setPasswd(password)}/>
        </View>

      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={login }>
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
