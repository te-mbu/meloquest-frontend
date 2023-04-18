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

export default function SigninScreen({ navigation }) {
  const dispatch = useDispatch();


  //  Etats pour Sign In de l'USER
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');


  // Variable pour le fetch dans une fonction handleConnection
  const handleConnection = () => {
    //fetch('https://meloquest-backend.vercel.app/users/signin', {
    fetch("http://localhost:3000/users/signin", {
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
          console.log(data)
          dispatch(login({ email: signInEmail, token: data.token }))
          setSignInEmail('');
          setSignInPassword('');
          if (data.profileType === "organiser") {
            navigation.navigate('OrgaTabNavigator');
          } else if (data.profileType === "customer") {
            navigation.navigate('UserTabNavigator', {screen: 'UserHomePage'});
          }
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

          <View style={styles.signinContainer}>
            
            <Text style={styles.title}>Se Connecter</Text>

            <TextInput
              style={styles.textInput}
              placeholder="Email"
              id="signInEmail"
              onChangeText={(value) => setSignInEmail(value)}
              value={signInEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              placeholder="Password"
              id="signInPassword"
              onChangeText={(value) => setSignInPassword(value)}
              value={signInPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity onPress={() => handleConnection()} style={styles.signinBtn}>
              <Text style={styles.signin}>Connexion</Text>
            </TouchableOpacity>

            <Text style={styles.alter}>Pas encore inscrit ?</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Role")}>
              <Text style={styles.signupLink}>Créer un compte</Text>
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

  signinContainer: {
    alignSelf: 'center',
    marginTop:'30%',
    height: 400,
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

  signinBtn: {
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

  signin: {
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
