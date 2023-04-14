import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import EventM from "../components/EventM";

export default function UserEventPageScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* zone de titre "Evenements" */}
        <View style={styles.title}>
          <Text style={styles.textTitle}>Evenements</Text>
        </View>

        {/* bloc de la cardevent medium */}
        <EventM />

        {/* bloc de la description */}
        <View style={styles.blocDesc}>
          <Text style={styles.textDesc}>Description</Text>
        </View>

        <View style={styles.blocBio}>
          <Text style={styles.textEvent}>
            {" "}
            loremipsumloremipsumnbchjdbhfjbdhjfbdhbfjhdvfhjdvfhbsdjfhbnsklbfhsbfdjksqvfhbnsjfvjhsbnfkkbsjhfbsjkfdbqhkj
          </Text>
        </View>

        {/* bloc de la localisation*/}
        <View style={styles.bloclocation}>
          <Text style={styles.textloca}>Localisation</Text>
        </View>

        <MapView mapType="hybrid" style={styles.map}></MapView>

        {/* bloc réservation + prix */}
        <View style={styles.blocPrix}>
          <View style={styles.prix}>
            <Text style={styles.textprix}> prix </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserBooking")}
            style={styles.buttonBook}
            activeOpacity={0.8}
          >
            <Text style={styles.textButton}> Réserver ! </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black",
  },

  eventContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "red",
  },

  // bloc du titre
  title: {
    width: "100%",
    alignItems: "center",
    // backgroundColor: 'purple',
    height: 50,
    marginBottom: "10%",
  },

  // css du titre evenement
  textTitle: {
    fontSize: 20,
    marginBottom: 10,
    color: "white",
    alignItems: "center",
  },

  card_M: {
    backgroundColor: "green",
    height: 250,
    width: "100%",
    color: "white",
  },

  blocDesc: {
    fontSize: 30,
    marginBottom: 10,
    height: 50,
    width: "100%",
    backgroundColor: "black",
    marginTop: "10%",
  },

  textDesc: {
    color: "white",
    fontSize: 20,
  },

  blocBio: {
    backgroundColor: "gray",
    width: "100%",
    height: "auto",
    borderRadius: 10,
  },

  textEvent: {
    color: "red",
    alignItems: "center",
  },

  bloclocation: {
    // backgroundColor: 'red',
    width: "100%",
    height: 50,
    marginTop: "10%",
  },

  textloca: {
    color: "white",
    fontSize: 20,
    alignSelf: "left",
  },

  map: {
    // prend en compte la taille de mon écran
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.3,
    marginTop: "10%",
  },

  blocPrix: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: "12%",
    marginLeft: "12%",
    marginTop: "20%",
    // backgroundColor: 'red'
  },

  prix: {
    borderWidth: 1,
    borderRadius: "50%",
    padding: "5%",
    backgroundColor: "#4C32CC",
  },

  textprix: {
    color: "white",
    fontSize: 30,
    alignSelf: "center",
  },

  buttonBook: {
    borderWidth: 1,
    borderRadius: "50%",
    padding: "5%",
    backgroundColor: "#4C32CC",
  },

  textButton: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
});
