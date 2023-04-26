import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserValidationScreen({ navigation }) {

  return (
    <SafeAreaView style={styles.fullScreen}>
      <View style={styles.fullContainer}>
        <Image source={require('../assets/logo_meloQsmall.png')} style={styles.background} />
        <View style={styles.maincontainer}>
          <View style={styles.container}>
          <FontAwesome name="check" color="green" size={30} style={styles.icon} />
            <Text style={styles.text}>Paiement accepté !</Text>
            <Text style={styles.text}>Le plus dur est passé !</Text>
            <Text style={styles.text}>Maintenant place à la zik !</Text>
          </View>
          <View style={styles.btncontainer} >
            <TouchableOpacity onPress={() => navigation.navigate('Ticket')} style={styles.btnstyle} activeOpacity={0.8}>
              <Text style={styles.textbutton}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    display: "flex",

  },

  fullContainer: {
    backgroundColor: "black",
    height: "100%",
    width: "100%"
  },

  background: {
    width: 300,
    height: 300,
    objectFit: "contain",
    alignSelf:"center",
    marginTop:"18%"
  },

  icon:{
    alignSelf:"center"
  },

  container: {
    borderWidth: 1,
    backgroundColor: "black",
    marginLeft: "3%",
    marginRight: "3%",
    borderRadius: 10,
    marginBottom: "15%",
    padding: "3%"
  },
  maincontainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10%",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: "4%",
    fontSize: 20,
  },
  btnstyle: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: "5%",
    paddingHorizontal: 10,
    alignItems: "flex-end",
    marginBottom: 50
  },
  textbutton: {
    padding: "5%",
    color: "black"
  }, 
  btncontainer:{
    marginBottom: 50
  }
});

