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
import { useSelector } from "react-redux";
const { formatDate, formatHour } = require('../modules/date')

export default function UserHomePageScreen() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://meloquest-backend.vercel.app/events/allevents")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.city);
      });
  }, []);

  


  const allEvents = events.map((data, i) => {
    return (
        <EventM
          key={i}
          isClickable={true}
          clientId={data._id}
          name={data.name}
          genres={data.genre}
          venue={data.address.venue}
          date={formatDate(data.timeDetails.timeStart)}
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
        <View style={styles.eventsContainer}>{allEvents}</View>
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
