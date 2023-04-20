import React from "react";
import Event_S_Stats from "../components/Event_S_Stats";
import {
  Image,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from "react-native";

export default function OrgaEventStatsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.containerone}>
          <Text style={styles.title}>Statistiques</Text>
        </View>
        <Event_S_Stats />
        <Event_S_Stats />
        <Event_S_Stats />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollViewContainer: {
    backgroundColor: "#262626"
  },
  containerone: {
    marginTop: "7%",
    backgroundColor: '#000000'
  },

  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
    borderWidth: 1
  },
  // cardcontainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   height: 100,
  //   width: "100%",
  //   borderWidth: "2px",
  //   borderColor: "#000000",
  //   marginTop: "20%"
  // },
  // left: {
  //   height: "100%",
  //   width: "30%",
  // },
  // right: {
  //   display: "flex",
  //   flexDirection: "column",
  //   justifyContent: "space-between",
  //   height: "100%",
  //   width: "70%",
  //   padding: 10,
  //   backgroundColor: '#ffffff',
  // },
});

