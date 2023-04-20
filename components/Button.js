import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

export default function Button({ theme}) {
  if (theme === "primary") {
    return (
      <View style={[styles.button, { backgroundColor: "#fff" }]}>
        <Text> Upload image </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    padding: "5%",
    borderRadius: "10%"
  },
});
