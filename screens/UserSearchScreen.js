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
import EventSOneSearch from "../components/EventSOneSearch";
import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { formatDate, formatHour } from "../modules/date";

export default function UserSearchScreen({}) {
  const [events, setEvents] = useState([]);
  const [searchMsg, setSearchMsg] = useState("");

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
      <EventSOneSearch
        key={i}
        name={data.name}
        venue={data.address.venue}
        price={data.price}
        date={formatDate(data.timeDetails.timeStart)}
        timeStart={formatHour(data.timeDetails.timeStart)}
        event_id={data.event_id}
        url={data.url}
      />
    );
  });

  const handleSearch = () => {
    fetch("https://meloquest-backend.vercel.app/events/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchMsg: searchMsg,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setEvents(data.data);
        } else {
          console.log("No events found");
        }
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollViewContainer}>
        <View style={styles.body}>
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={(value) => setSearchMsg(value)}
              value={searchMsg}
              style={styles.searchText}
              placeholder="Rechercher"
            />
            <TouchableOpacity
              onPress={() => handleSearch()}
              style={styles.searchButton}
            >
              <FontAwesome name="search" size={13} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <View style={styles.events}>{allEvents}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  ScrollViewContainer:{
    backgroundColor: "#262626",
  },
  // bannerContainer: {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center",
  //   width: "100%",
  //   height: 170,
  //   backgroundColor: "#000000",
  // },
  // // // logoutContainer: {
  // // //   flex: 1,
  // // //   alignSelf: "flex-end",
  // // //   marginTop: 10,
  // // //   marginRight: 10,
  // // //   backgroundColor: "purple",
  // // //   borderRadius: 15,
  // // },
  // logoutText: {
  //   color: "#ffffff",
  //   paddingHorizontal: 12,
  //   paddingVertical: 5,
  //   fontWeight: "bold",
  // },
  // userIcon: {
  //   width: "100%",
  //   flex: 3,
  // },
  // icon: {
  //   alignSelf: "center",
  // },
  // userContainer: {
  //   backgroundColor: "#ffffff",
  //   flex: 1,
  //   marginBottom: 10,
  //   borderRadius: 15,
  // },
  // username: {
  //   paddingHorizontal: 12,
  //   paddingVertical: 5,
  //   color: "#000000",
  //   fontWeight: "bold",
  // },
  // titleContainer: {
  //   flex: 2,
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // title: {
  //   fontWeight: "bold",
  //   width: "100%",
  //   textAlign: "center",
  //   fontSize: 20,
  //   padding: "3%",
  //   backgroundColor: "#ffffff",
  // },
  searchContainer: {
    backgroundColor: "#ffffff",
    height: 40,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "black",
    marginTop:'5%'
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
  },
});
