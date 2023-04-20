import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EventSOne from "../components/EventSOne";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/user";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { formatDate, formatHour } from "../modules/date";
import EventSOneSearch from "../components/EventSOneSearch";

export default function OrgaProfileScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const isFocused = useIsFocused();
  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    if (isFocused) {
      setToken(userToken);
      fetch(
        `https://meloquest-backend.vercel.app/events/organiser/${userToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setEvents([...data.data]);
            setDataLoaded(true);
          } else {
            console.log("Events not found");
          }
        });
    }
  }, [isFocused]);

  if (!dataLoaded) {
    return (
      <View style={styles.loaded}>
        <Text style={styles.textload}> Chargement en cours...</Text>
        <FontAwesome name="optin-monster" color="purple" size={40} style={styles.icon} />
      </View>
    );
  }

  const allEvents = events.map((data, i) => {

    return (
      <EventSOne
        key={i}
        name={data.name}
        venue={data.address.venue}
        price={data.price}
        date={formatDate(data.timeDetails.timeStart)}
        timeStart={formatHour(data.timeDetails.timeStart)}
      />
    );
  });

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    navigation.navigate("Signin");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.logoutContainer}>
          <Text onPress={() => handleLogout()} style={styles.logoutText}>
            Déconnexion
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Mes évènements</Text>
          </View>
          <View style={styles.eventsLikedContainer}>{allEvents}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loaded:{
    display:'flex',
    flex:1,
    marginTop:'40%',
    alignSelf:'center'
  },

  scrollViewContainer:{
    backgroundColor: "#262626",
  },

  textload:{
    fontSize:25

  },

  logoutContainer: {
    flex: 1,
    alignSelf: "flex-end",
    marginVertical: 10,
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
  container: {
    flex: 1,
  },
  body: {
    marginTop: 10,
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
