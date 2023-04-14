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

export default function OrgaCreateEventScreen() {
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
            <Text style={styles.title}>Créer un évènement</Text>
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={[styles.textInput, styles.nameInput]}
              placeholder="Nom de l'évènement"
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.leftForm}>
              <TextInput style={styles.textInput} placeholder="Date" />
              <TextInput style={styles.textInput} placeholder="Heure début" />
              <TextInput style={styles.textInput} placeholder="Ville" />
              <TextInput style={styles.textInput} placeholder="Adresse" />
            </View>
            <View style={styles.rightForm}>
              <TextInput style={styles.textInput} placeholder="Prix" />
              <TextInput style={styles.textInput} placeholder="Heure fin" />
              <TextInput style={styles.textInput} placeholder="Nom du lieu" />
              <TextInput style={styles.textInput} placeholder="Genre" />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.descriptionContainer}>
              <TextInput placeholder="Entrez votre description" />
            </View>
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.upload}>Upload Image</Text>
              </TouchableOpacity>
              <View style={styles.share}>
                <FontAwesome name="plus" color="#ffffff" />
              </View>
            </View>
            <TouchableOpacity style={styles.createEventContainer}>
              <Text style={styles.createEventText}>Créer l'évènement</Text>
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
    height: 230,
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
    height: "100%",
  },
  nameInputContainer: {
    height: 80,
    paddingTop: 15,
  },
  nameInput: {
    marginBottom: 15,
    alignSelf: "center",
  },

  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
  },

  descriptionContainer: {
    borderRadius: 5,
    marginTop: 10,
    height: 80,
    width: "90%",
    backgroundColor: "#ffffff",
  },

  bottomContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: '50%'
  },
  uploadButton: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  upload: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  createEventContainer: {
    backgroundColor: "#ffffff",
    marginRight: 30,
    borderRadius: 15,
    marginBottom: 15,
  },
  createEventText: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
});
