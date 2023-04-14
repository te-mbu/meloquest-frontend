import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function EventSOne() {
  return (
    <View style={styles.eventSContainer}>
      <View style={styles.left}>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../assets/eventPhoto.png")}
        ></ImageBackground>
      </View>
      <View style={styles.right}>
        <Text>Name</Text>
        <Text>Lieu</Text>
        <Text>Date | Heure | Prix</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  eventSContainer: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    width: "100%",
    borderWidth: "2px",
    borderColor: "#000000",
  },
  left: {
    height: "100%",
    width: "30%",

  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "70%",
    padding: 10,
    backgroundColor: '#ffffff',
  },
});
