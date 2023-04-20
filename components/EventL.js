import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function EventL(props) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image
            source={{uri: props.url}}
            style={styles.background}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Nom de l'évènement :{} {props.name}</Text>
          <Text style={styles.text}>Où ? {props.venue} </Text>
          <Text style={styles.text}>Quand ? {props.date}</Text>
          <Text style={styles.text}>De {props.timeStart} à {props.timeEnd}</Text>
        </View>
      </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: "black",
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  backgroundContainer: {
    width: '100%',
    height: 320,
    borderRadius: 15,
  },
  background: {
    width: "100%",
    height:'100%'
  },
  text: {
    color: "black",
    textAlign: "center",
    padding: 10,
    fontWeight: 'bold'
  },
  textContainer: {
    borderWidth: 1,
    backgroundColor: "white",
    width: '90%',
    borderRadius: 7,
    marginTop: 10,
  },
});
