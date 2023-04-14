import React from "react";
import {
  Text,
  View,
  StyleSheet,
} from "react-native";

export default function TagGenre(props) {
  return (
    <View style={styles.genreContainer}>
      <Text style={styles.genreText}>{props.genre}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  genreContainer: {
    backgroundColor: "purple",
    borderRadius: 15,
  },
  genreText: {
    alignSelf: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    color: "#ffffff",
    fontWeight: "bold",
  },
});
