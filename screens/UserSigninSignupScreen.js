import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../reducers/user';

export default function UserSigninSignupScreen({ navigation }) {
  const dispatch = useDispatch();

  //  Etats pour sign up de l'USER
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')

  //  Etats pour Sign In de l'USER
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  // Variable pour le fetch dans une fonction handleRegister
  const handleRegister = () => {
    fetch('http://10.6.241.35:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: signUpUsername,
        email: signUpEmail,
        password: signUpPassword,
        profileType: 'customer'
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, email: signUpEmail, token: data.token }))
          setSignUpUsername('');
          setSignUpEmail('');
          setSignUpPassword('');
          navigation.navigate('UserPosition')
        }
      })
  }

  // Variable pour le fetch dans une fonction handleConnection
  const handleConnection = () => {
    fetch('http://10.6.241.35:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ email: signInEmail, token: data.token }))
          setSignInEmail('');
          setSignInPassword('');
          navigation.navigate('UserPosition')
          
        }
      })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/photobleue.jpg")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <Text style={styles.title}>Connexion / Inscription</Text>
          </View>
          <View style={styles.formContainer}>
            <View style={styles.leftForm}>
              <TextInput style={styles.textInput} placeholder="Username" id='signUpUsername' onChangeText={(value) => setSignUpUsername(value)} value={signUpUsername} autoCapitalize='none' />
              <TextInput style={styles.textInput} placeholder="Email" id='signUpEmail' onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} autoCapitalize='none' />
              <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" id='signUpPassword' onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} autoCapitalize='none' />
            </View>
            <View style={styles.rightForm}>
              <TextInput style={styles.textInput} placeholder="email" id='signInEmail' onChangeText={(value) => setSignInEmail(value)} value={signInEmail} autoCapitalize='none' />
              <TextInput style={styles.textInput}  secureTextEntry={true} placeholder="Password" id='signInPassword' onChangeText={(value) => setSignInPassword(value)} value={signInPassword} autoCapitalize='none' />
            </View>
          </View>
          <View style={styles.bottomContainer}>

            <TouchableOpacity onPress={() => handleRegister()} style={styles.signupContainer}>
              <Text style={styles.signup} >S'inscrire</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleConnection()} style={styles.signinContainer}>
              <Text style={styles.signin}>Se connecter</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
  },
  formContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "row",
  },
  leftForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "100%",
    borderRightWidth: "2px",
    borderRightColor: "#ffffff",
  },
  rightForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "57%",
  },
  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
  },

  bottomContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signupContainer: {
    backgroundColor: "#ffffff",
    marginLeft: 40,
    borderRadius: 15,
  },
  signup: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  signinContainer: {
    backgroundColor: "#ffffff",
    marginRight: 30,
    borderRadius: 15,
  },
  signin: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
});
