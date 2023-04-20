import React from 'react'
import {
    Image,
    Text,
    View,
    StyleSheet,
  } from "react-native";


export default function Event_S_Stats(props) {

  return (
    <View style={styles.cardcontainer}>
        <View style={styles.left}>
            <Image 
              style={{ flex: 1, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}
              source={{ uri: props.url}}>
            </Image>
          </View>
          <View style={styles.right}>
            <Text><Text style={{fontWeight: 'bold', color:'purple'}}>{props.name} </Text>| {props.venue} | {props.date}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Nombre de ventes : </Text>{props.nbPurchases}</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Nombre de likes : </Text>{props.nbLikes}</Text>
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
      marginTop: 10,
      borderRadius: 15,
      overflow: 'hidden',
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
      borderTopRightRadius: 15, 
      borderBottomRightRadius: 15
    },
  });