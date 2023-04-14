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
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserPaymentScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/photoblanche.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <Text style={styles.title}>Paiement par carte</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput style={styles.textInput} placeholder="Nom" />
            <TextInput style={styles.textInput} placeholder="Prénom" />
            <TextInput style={styles.textInput} placeholder="Numéro de carte" />
            <View style={styles}>

                <TextInput style={styles.textInput} placeholder="Date d'expiration" />
                <TextInput style={styles.textInput} placeholder="CVC" />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('UserValidation')} style={styles.validationContainer}>
                <Text style={styles.validationText}>Valider le paiement</Text>
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
    height: 80,
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
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    width: "100%",
    backgroundColor: 'purple',
  },
  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: 'center',
  },
  validationContainer: {
    height: 50,
    backgroundColor: 'green',
  },
  validationText: {
    alignSelf: 'center',
  }
});
