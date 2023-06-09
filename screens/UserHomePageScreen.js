import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import EventM from "../components/EventM";
import { useState, useEffect } from "react";
const { formatDate, formatHour } = require("../modules/date");
import { useIsFocused } from "@react-navigation/native";

export default function UserHomePageScreen({ }) {
  const [events, setEvents] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetch("https://meloquest-backend.vercel.app/events/allevents")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data.city);
        });
    }
  }, [isFocused]);

  const allEvents = events.map((data, i) => {
    return (
      <EventM
        key={i}
        isClickable={true}
        event_id={data.event_id}
        name={data.name}
        genres={data.genre}
        venue={data.address.venue}
        date={formatDate(data.timeDetails.timeStart)}
        timeStart={formatHour(data.timeDetails.timeStart)}
        timeEnd={formatHour(data.timeDetails.timeEnd)}
        price={data.price}
        url={data.url}
      />
    );
  });

  // Variable pour fetch les évents filter dans une fonction handleTonight
  const handleTonight = () => {
    fetch("https://meloquest-backend.vercel.app/events/tonight")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result && data.tonight) {
          setEvents(data.tonight);
        }
      });
  };

  // Variable pour fetch les évents filter dans une fonction handleWeek
  const handleWeek = () => {
    fetch("https://meloquest-backend.vercel.app/events/week")
      .then((response) => response.json())
      .then((data) => {
        if (data.result && data.week) {
          setEvents(data.week);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollViewContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Évènements</Text>
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => handleTonight()}
            style={styles.tonightContainer}
          >
            <Text style={styles.textTonight}>Ce soir</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleWeek()}
            style={styles.weekContainer}
          >
            <Text style={styles.textweek}>Cette Semaine</Text>
          </TouchableOpacity>

          {/* <View style={styles.trendContainer}>
            <Text style={styles.textTrend}>Tendances</Text>
          </View> */}
        </View>

        <View style={styles.eventsContainer}>
          {allEvents}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScrollViewContainer: {
    backgroundColor: "#262626"
  },

  titleContainer: {
    height: 50,
    backgroundColor: "white",
    marginTop: '7.8%',
    marginBottom: '7%',
    width: '100%'
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
  },

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
    backgroundColor: "#262626",
  },

  tonightContainer: {
    backgroundColor: "purple",
    height: "80%",
    width: "30%",
    borderRadius: 30,
  },
  textTonight: {
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff",
    paddingTop: 10,
  },

  weekContainer: {
    height: "80%",
    width: "30%",
    backgroundColor: "purple",
    borderRadius: 30,
  },
  textweek: {
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff",
    paddingTop: 10,
  },

  trendContainer: {
    backgroundColor: "purple",
    borderRadius: 30,
    height: "80%",
    width: "30%",
  },
  textTrend: {
    fontSize: 18,
    alignSelf: "center",
    color: "#ffffff",
    paddingTop: 10,
  },

  eventsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

  },
});
