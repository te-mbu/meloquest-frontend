import React, { useEffect } from "react";
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
import EventMNonClickable from '../components/EventMNonClickable'
import { useSelector } from "react-redux";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { formatDate, formatHour } = require("../modules/date");

export default function UserEventPageScreen({ navigation }) {
  const [event, setEvent] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const eventToPurchase = useSelector(
    (state) => state.user.value.eventToPurchase
  );

  useEffect(() => {
    setEvent([eventToPurchase]);
    setDataLoaded(true);
  }, [eventToPurchase]);
  
  if (!dataLoaded) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }
  
  const eventDetails = event.map((data, i) => {
    return (
      <EventMNonClickable
        key={i}
        isClickable={false}
        genres={data.genre}
        name={data.name}
        event_id={data.event_id}
        venue={data.address.venue}
        date={formatDate(data.timeDetails.timeStart)}
        timeStart={formatHour(data.timeDetails.timeStart)}
        timeEnd={formatHour(data.timeDetails.timeEnd)}
        price={data.price}
        url={data.url}
      />
      );
    });
    
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowBack}
        >
          <FontAwesome name="arrow-circle-left" color="#ffffff" size={30} />
        </TouchableOpacity>

        {/* zone de titre "Evenements" */}
        <View style={styles.titleContainer}>
          <Text style={styles.textTitle}>Détails de l'évènement</Text>
        </View>

        {/* bloc de la cardevent medium */}
        {eventDetails}

        {/* bloc de la description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>Description</Text>
        </View>

        <View style={styles.blocBio}>
          <Text style={styles.textEvent}> {event[0].description}</Text>
        </View>

        {/* bloc de la localisation*/}
        <View style={styles.bloclocation}>
          <Text style={styles.textloca}>Localisation</Text>
        </View>

        <MapView mapType="hybrid" style={styles.map}></MapView>

        {/* bloc réservation + prix */}
        <View style={styles.blocPrix}>
          <View style={styles.prix}>
            <Text style={styles.textprix}>{event[0].price} €</Text>
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
  arrowBack: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 15,
  },
  eventContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "red",
  },

  // bloc du titre
  titleContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginBottom: 10,
  },

  // css du titre evenement
  textTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
    alignItems: "center",
  },

  card_M: {
    backgroundColor: "green",
    height: 250,
    width: "100%",
    color: "white",
  },

  descriptionContainer: {
    fontSize: 30,
    marginBottom: 10,
    height: 50,
    width: "100%",
    marginTop: 10,
    justifyContent: "center",
  },

  description: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  blocBio: {
    backgroundColor: "#ffffff",
    width: "100%",
    height: "auto",
    borderRadius: 10,
  },

  textEvent: {
    padding: 15,
    color: "#000000",
    alignItems: "center",
  },

  bloclocation: {
    width: "100%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
  },

  textloca: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },

  map: {
    // prend en compte la taille de mon écran
    width: Dimensions.get("window").width * 1,
    height: Dimensions.get("window").height * 0.3,
    marginTop: 10,
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
    fontSize: 25,
    alignSelf: "center",
  },
  
  buttonBook: {
    borderWidth: 1,
    borderRadius: "50%",
    padding: "5%",
    backgroundColor: "#4C32CC",
    justifyContent: 'center'
  },
  
  textButton: {
    fontWeight: 'bold',
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },
});
