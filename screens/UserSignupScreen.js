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
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserSigninSignupScreen({ navigation }) {
  const dispatch = useDispatch();

  //  Etats pour sign up de l'USER
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')


  // Variable pour le fetch dans une fonction handleRegister
  const handleRegister = () => {
    fetch('https://meloquest-backend.vercel.app/users/signup', {
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
          navigation.navigate('UserTabNavigator', {screen: 'UserHomePage'});
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowBack}>
            <FontAwesome name="arrow-circle-left" color="#ffffff" size={30} />
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            
            <Text style={styles.title}>Créer un compte</Text>

            <TextInput
                style={styles.textInput}
                placeholder="Username"
                id="signUpUsername"
                onChangeText={(value) => setSignUpUsername(value)}
                value={signUpUsername}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                id="signUpEmail"
                onChangeText={(value) => setSignUpEmail(value)}
                value={signUpEmail}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="Password"
                id="signUpPassword"
                onChangeText={(value) => setSignUpPassword(value)}
                value={signUpPassword}
                autoCapitalize="none"
              />

            <TouchableOpacity onPress={() => handleRegister()} style={styles.signupBtn}>
              <Text style={styles.signup}>Inscription</Text>
            </TouchableOpacity>

            <Text style={styles.alter}>Déjà inscrit ?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
              <Text style={styles.signupLink}>Se Connecter</Text>
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

  arrowBack: {
    paddingTop: 25,
    paddingLeft: 25,
  },

  signupContainer: {
    alignSelf: 'center',
    marginTop:'30%',
    height: 465,
    width: 280,
    backgroundColor: '#ffffff',
    opacity: 0.9,
    borderRadius: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  textInput: {
    width: "60%",
    borderBottomColor: '#808080',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 25,
  },

  signupBtn: {
    height : 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid', 
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    marginTop: 20,
    fontWeight: "bold",
  },

  signup: {
    fontSize: 16,
    fontWeight: "bold",
  },

  alter:{
    marginTop: 50,
    fontWeight: "bold",
    fontSize: 12,
  },

  signupLink: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  }
});
