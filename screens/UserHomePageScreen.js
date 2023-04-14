import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import EventM from "../components/EventM";
import { useState, useEffect } from "react";

export default function UserHomePageScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {

    fetch("http://10.6.241.35:3000/events/allevents")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.city);
      });
  }, []);

  function formatDate(dateString) {
    let date = new Date(dateString);
    let formattedDate =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      date.getDate().toString().padStart(2, "0");
    // console.log("FORMATTED ->", formattedDate)
    return formattedDate;
  }

  function formatHour(dateString) {
    let date = new Date(dateString);
    let formattedTime =
      date.getUTCHours().toString().padStart(2, "0") +
      ":" +
      date.getUTCMinutes().toString().padStart(2, "0");
    return formattedTime
  }


  const allEvents = events.map((data, i) => {

    console.log(data.genre)
    return (
      <EventM
        key={i}
        name={data.name}
        genres={data.genre}
        venue={data.address.venue}
        date={formatDate(data.timeDetails.date)}
        timeStart={formatHour(data.timeDetails.timeStart)}
        timeEnd={formatHour(data.timeDetails.timeEnd)}
        price={data.price}
      />
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Évènements</Text>
        </View>
        <View style={styles.eventsContainer}>
          {/* <EventM />
          <EventM />
          <EventM /> */}
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
  titleContainer: {
    height: 50,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 30,
    alignSelf: "flex-start",
    color: "#ffffff",
    paddingTop: 5,
    paddingLeft: 10,
  },
  eventsContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
