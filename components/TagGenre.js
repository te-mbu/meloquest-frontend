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
    marginVertical: 5,
    width:'auto',
  },
  genreText: {
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: "#ffffff",
    fontWeight: "bold",
    justifyContent:"center",
    fontSize:17
    
  },
});
