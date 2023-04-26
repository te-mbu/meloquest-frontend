import React from "react";
import EventL from "../components/EventL";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { formatDate, formatHour } = require('../modules/date')

export default function UserBookingScreen({ navigation }) {
  const [event, setEvent] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const eventToPurchase = useSelector(
    (state) => state.user.value.eventToPurchase
  );
  const [count, setCount] = useState(1)

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
      <EventL
        key={i}
        name={data.name}
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
      <SafeAreaView style={styles.maincontainer}>
      <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowBack}
        >
          <FontAwesome name="arrow-circle-left" color="#ffffff" size={30} />
        </TouchableOpacity>
      {eventDetails}
      <View style={styles.container}>
        <View style={styles.sectionone}>
          <TouchableOpacity onPress={() => count > 1 ? setCount(count - 1): null} style={styles.round}>
            <Text style={styles.roundstyle}> - </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.square}>
            <Text style={styles.count}> {count} </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCount(count + 1)} style={styles.round}>
            <Text style={styles.roundstyle}> + </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectiontwo}>
          <TouchableOpacity style={styles.styleprice}>
            <Text style={styles.textprice}>
              Total: <Text style={styles.bold}>{ count * event[0].price } €</Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sectionthree}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UserPayment")}
            style={styles.stylebtn}
          >
            <Text style={styles.textbtn}> Allez zou ! À la caisse ! </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
  },
  arrowBack: {
    height: 70,
    justifyContent: "center",
    paddingLeft: 15,
  },
  sectionone: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  round: {
    borderWidth: 1,
    borderRadius: "50%",
    padding: 5,
    backgroundColor: "#4C32CC",
  },
  roundstyle: {
    color: "white",
    padding:10,
  },
  square: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#FFC54B",
  },
  count: {
    padding: 3,
  },
  styleprice: {
    borderWidth: 1,
    borderRadius: "50%",
    backgroundColor: "#4C32CC",
    marginHorizontal:70,
  },
  textprice: {
    textAlign: "center",
    color: "white",
    paddingVertical: 10,
    fontSize: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  sectiontwo: {
    marginBottom: 10,
    flex: 1,
  },
  stylebtn: {
    borderWidth: 1,
    alignItems: "center",
    alignSelf: "center",
  
    padding: 10,
    borderRadius: "50%",
    backgroundColor: "#4C32CC",
  },
  textbtn: {
    color: "white",
    paddingVertical: 5,
    fontSize: 22,
  },
  sectionthree: {
    width: "100%",
    flex: 1,
    marginBottom: 10,
  },
});
