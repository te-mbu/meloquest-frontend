import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
  } from "react-native";


export default function Event_S_Stats() {
  return (
    <View style={styles.cardcontainer}>
        <View style={styles.left}>
            <Image 
              style={{ flex: 1 }}
              source={require("../assets/photobleue.jpg")}>
            </Image>
          </View>
          <View style={styles.right}>
            <Text>Name      |    Lieu    |    Date</Text>
            <Text>Nombre de ventes :</Text>
            <Text>Nombre de likes :</Text>
          </View>
        </View>
  )
}

const styles = StyleSheet.create({
    title: {
      fontWeight: "bold",
      width: "100%",
      textAlign: "center",
      fontSize: 20,
      padding: "3%",
      backgroundColor: "#ffffff",
      borderWidth: 1
    },
    cardcontainer: {
      display: "flex",
      flexDirection: "row",
      height: 100,
      width: "100%",
      borderWidth: "2px",
      borderColor: "#000000",
      marginTop: "8%",
    
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