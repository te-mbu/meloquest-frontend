import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function EventSOne(props) {
 

  return (
    <View style={styles.eventSContainer}>
      <View style={styles.left}>
        <ImageBackground
          style={{ flex: 1 }}
          source={{ uri : props.url }}
        ></ImageBackground>
      </View>
      <View style={styles.right}>
        <View style={styles.iconContainer}>
          <FontAwesome name="music" color="orange" size={15} />
          <Text style={styles.iconPosition}> {props.name}</Text>
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="map-pin" color="orange" size={15} />
          <Text style={styles.iconPosition}>{props.venue}</Text>
        </View>
        
        <View style={styles.iconContainer}>
        <FontAwesome name="lightbulb-o" color="orange" size={15} />
          <Text style={styles.iconPosition}>{props.date} | {props.timeStart} | {props.price} €</Text>
        </View>
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
    borderRadius: '15%',
    overflow: 'hidden',
    marginVertical: 5,
  },
  left: {
    height: "100%",
    width: "30%",

  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-evenly',
    height: "100%",
    width: "70%",
    // padding: 10,
    backgroundColor: 'white',
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    // height: "100%",
    // width: "70%",
    // padding: 10,
    // backgroundColor: '#ffffff',
  },

  

  iconPosition: {
    marginLeft: 10,
  },
  
});
