import React from "react";
import Event_S_Stats from "../components/Event_S_Stats";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { formatDate } from "../modules/date";

export default function OrgaEventStatsScreen() {

  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [nbLikes, setNbLikes] = useState([])
  const [nbPurchases, setNbPurchases] = useState([])

  const isFocused = useIsFocused();
  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    if (isFocused) {
      setToken(userToken);
      // Get organiser informations by his token (event organised with nb liked/nb purchased)
      fetch(`https://meloquest-backend.vercel.app/events/organiser/${userToken}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setEvents([...data.data]);
            setNbLikes([...data.likes])
            setNbPurchases([...data.purchases])
            setDataLoaded(true);
          } else {
            console.log("Events not found");
          }
        });
    }
    // Every time we open the tab the useEffect is run
  }, [isFocused]);

  // Page loaded while fetch is loading
  if (!dataLoaded) {
    return (
      <View>
        <Text>Soyez patient, ça arrive...</Text>
      </View>
    );
  }


  const allEvents = events.map((data, i) => {
    return (
      <Event_S_Stats
        key={i}
        name={data.name}
        venue={data.address.venue}
        date={formatDate(data.timeDetails.timeStart)}
        nbLikes={nbLikes[i]}
        nbPurchases={nbPurchases[i]}
        url={data.url}
      />
    );
  });

  return (
    <SafeAreaView style={{flex : 1}}>
      <ScrollView style={{backgroundColor: '#262626'}}>
        <View style={styles.containerone}>
          <Text style={styles.title}>Stats</Text>
        </View>
          {allEvents}
      </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  containerone: {
    marginTop: 10,
    marginBottom:10,
    backgroundColor:'#000000'
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
  cardcontainer: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    width: "100%",
    borderWidth: "2px",
    borderColor: "#000000",
    marginTop: "20%"
  },
  left: {
    height: "100%",
    width: "30%",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "70%",
    padding: 10,
    backgroundColor: '#ffffff',
  },
});

