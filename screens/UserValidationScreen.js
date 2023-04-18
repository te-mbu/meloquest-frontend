import React from "react";

import {
  Image,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";


export default function UserValidationScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.fullScreen}>
      <Image source={require('../assets/logo_meloQsmall.png')} style={styles.background} />
        <View style={styles.maincontainer}>
            <View style={styles.container}>
                <Text style={styles.text}>Paiement accepté !</Text>
                <Text style={styles.text}>Le plus dur est passé !</Text>
                <Text style={styles.text}>Maintenant place à la zik !</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('UserHomePage')} style={styles.btnstyle} activeOpacity={0.8}>
                    <Text style={styles.textbutton}>Retour à l'accueil</Text>
                </TouchableOpacity>
            </View>
        </View>
        
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  background: {
    width: 300,
    height: 300,
    objectFit:"contain"
  },

  fullScreen:{
backgroundColor:"black",
flex:1,
justifyContent:"center",
alignItems:'center'
  },

  container: {
    borderWidth: 1,
    backgroundColor: "white",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 10, 
    marginBottom: "25%",
    padding: "12%"
  },
  maincontainer:{
    display:"flex",
    alignItems: "center",
    marginTop: "10%",
  },
  text: {
    color: "black",
    textAlign: "center",
    padding: "4%",
  },
  btnstyle :{
    position:"absolute",
    bottom:0,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: "5%",
    alignItems:"flex-end", 
  },
  textbutton:{
    padding: "5%",
    color: "black"
  }
});

