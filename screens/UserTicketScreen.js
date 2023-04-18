import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EventMNonClickable from "../components/EventMNonClickable";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import { formatDate, formatHour } from "../modules/date";

export default function UserTicketScreen() {
  const [token, setToken] = useState('')
  const [eventsPurchased, setEventsPurchased] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const userToken = useSelector((state) => state.user.value.token);
  const eventsPurchasedRed = useSelector((state) => state.user.value.eventsPurchased);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setToken(userToken);

      setEventsPurchased(eventsPurchasedRed)

      // fetch(`https://meloquest-backend.vercel.app/events/purchased/${token}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.result) {
      //       setEventsPurchased(data.data);
      //       setDataLoaded(true);
      //     } else {
      //       console.log("Events not found");
      //     }
      //   });
    }
  }, [isFocused]);


  console.log("all events ->", eventsPurchasedRed)
  const allEvents = eventsPurchasedRed.map((data, i) => {

    return <EventMNonClickable 
    key={i}
    // isClickable={false}
    genres={data.genre}
    name={data.name}
    event_id={data.event_id}
    venue={data.address.venue}
    date={formatDate(data.timeDetails.timeStart)}
    timeStart={formatHour(data.timeDetails.timeStart)}
    timeEnd={formatHour(data.timeDetails.timeEnd)}
    price={data.price}
    />
  }) 

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes tickets</Text>
          </View>
          <View style={styles.eventsLikedContainer}>
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
    backgroundColor: "#000000",
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
});
