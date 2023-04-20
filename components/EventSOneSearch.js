import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { addEventToPurchase } from "../reducers/user";
import { useNavigation } from "@react-navigation/native";

export default function EventSOneSearch(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const handleOnPress = () => {
    fetch(`https://meloquest-backend.vercel.app/events/${props.event_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(addEventToPurchase(data.event));
          navigation.navigate("UserEventPage");
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <TouchableOpacity
      // style={{width: '100%', height: '100%'}}
      onPress={() => handleOnPress()}
    >
      <View style={styles.eventSContainer}>
        <View style={styles.left}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require("../assets/eventPhoto.png")}
          ></ImageBackground>
        </View>
        
        <View style={styles.right}>
          <View style={styles.iconContainer}>
            <FontAwesome name="music" color="orange" size={15} />
            <Text style={styles.iconPosition}> {props.name}</Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome name="map-pin" color="orange" size={15} />
            <Text style={styles.iconPosition}>{props.venue}</Text>
          </View>

          <View style={styles.iconContainer}>
            <FontAwesome name="lightbulb-o" color="orange" size={15} />
            <Text style={styles.iconPosition}>{props.date} | {props.timeStart} | {props.price} €</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventSContainer: {
    display: "flex",
    flexDirection: "row",
    height: 100,
    width: "100%",
    borderWidth: "2px",
    borderColor: "#000000",
    borderRadius: '15%',
    overflow: 'hidden',
    marginVertical: 5,
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

  iconContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
  },

  iconPosition: {
    marginLeft: 10,
  },


});
