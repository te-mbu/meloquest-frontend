import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EventSOne from "../components/EventSOne";
import EventM from "../components/EventM";
import { useState, useEffect } from "react";

export default function UserSearchScreen({ }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://meloquest-backend.vercel.app/events/allevents")
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
        timeStart={formatHour(data.timeDetails.timeStart)}
        timeEnd={formatHour(data.timeDetails.timeEnd)}
        price={data.price}
      />
    );
  });

   // Variable pour fetch les évents filter dans une fonction handleWeek
   const handleSearch = () => {
    fetch('https://meloquest-backend.vercel.app/events/tonight') // pour tester la route avec les évents de la nuit 
      .then(response => response.json())
      .then(data => {
        if (data.result && data.tonight) {
          setEvents(data.tonight)
        }
      })
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchText}
              placeholder="Rechercher"
            />
            <TouchableOpacity onPress={() => handleSearch()} style={styles.searchButton}>
              <FontAwesome name="search" size={13} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.eventsLikedContainer}>
            {/* <EventSOne />
            <EventSOne />
            <EventSOne />
            <EventSOne />
            <EventSOne /> */}
            {allEvents}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  bannerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: 170,
    backgroundColor: "#000000",
  },
  logoutContainer: {
    flex: 1,
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10,
    backgroundColor: "purple",
    borderRadius: 15,
  },
  logoutText: {
    color: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  userIcon: {
    width: "100%",
    flex: 3,
  },
  icon: {
    alignSelf: "center",
  },
  userContainer: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginBottom: 10,
    borderRadius: 15,
  },
  username: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    color: "#000000",
    fontWeight: "bold",
  },
  titleContainer: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    height: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black"


  },
  searchText: {
    padding: 10,
    flex: 1,
  },

  searchButton: {
    backgroundColor: "purple",
    borderRadius: 15,
    marginLeft: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});
