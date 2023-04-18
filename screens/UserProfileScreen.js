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
import { logout } from "../reducers/user";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UserProfileScreen({ navigation }) {
  const [token, setToken] = useState("");
  const [eventsLiked, setEventsLiked] = useState("");
  const [eventsPurchased, setEventsPurchased] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.value.token);

  useEffect(() => {
    setToken(userToken);

    fetch(`https://meloquest-backend.vercel.app/events/liked/${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setEventsLiked(data.data);
          
          fetch(
            `https://meloquest-backend.vercel.app/events/purchased/${token}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.result) {
                setEventsPurchased(data.data);
                setDataLoaded(true);
              } else {
                console.log("Events not found");
              }
            });
        } else {
          console.log("Events not found");
        }
      });
  }, []);

  if (!dataLoaded) {
    return (
      <View>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  function handleLogout() {
    dispatch(logout());
    navigation.navigate("Role");
  }

  const allLiked = eventsLiked.map((data, i) => {
    return <EventSOne name={data.name} venue={data.address.venue} />;
  });

  const allPurchased = eventsPurchased.map((data, i) => {
    return <EventSOne name={data.name} venue={data.address.venue} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.bannerContainer}>
          <View style={styles.logoutContainer}>
            <Text onPress={() => handleLogout()} style={styles.logoutText}>
              Déconnexion
            </Text>
          </View>
          <View style={styles.userIcon}>
            <FontAwesome
              style={styles.icon}
              name="user"
              size="70"
              color="#ffffff"
            />
          </View>
          <View style={styles.userContainer}>
            <Text style={styles.username}>Lalalaa</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Évènements likés</Text>
          </View>
          <View style={styles.eventsLikedContainer}>{allLiked}</View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Évènements achetés</Text>
          </View>
          <View style={styles.eventsPurchasedContainer}>{allPurchased}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: "20px",
    padding: "3%",
    backgroundColor: "#ffffff",
  },
});
