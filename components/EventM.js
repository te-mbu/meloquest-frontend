import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TagGenre from "./TagGenre";
import { useNavigation } from "@react-navigation/native";
import UserEventPageScreen from "../screens/UserEventPageScreen";
import { useDispatch } from "react-redux";
import { addEventToPurchase } from "../reducers/user";

export default function EventM(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleOnPress = () => {
    fetch(`https://meloquest-backend.vercel.app/events/${props.event_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          console.log("EVENT M DATA EVENT -> ", data.event)
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

  let allGenres = props.genres;
  const genres = allGenres.map((data, i) => {
    return <TagGenre key={i} genre={data} />;
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={props.isClickable ? handleOnPress : null}>
        <View style={styles.topContainer}>
          <ImageBackground
            style={{ flex: 1 }}
            source={require("../assets/eventPhoto.png")}
          >
            <View style={styles.topContainerInfos}>
              <Text style={styles.title}>{props.name}</Text>
              <View style={styles.icons}>
                <View style={styles.share}>
                  <FontAwesome name="share" color="#ffffff" />
                </View>
                <View style={styles.heart}>
                  <FontAwesome name="heart" color="#ffffff" />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.details}>
          <View style={styles.left}>
            <View style={styles.leftInfos}>
              <Text>{props.venue}</Text>
              <Text>{props.date}</Text>
              <Text>
                {props.timeStart} - {props.timeEnd}
              </Text>
              <Text>{props.price}€</Text>
            </View>
          </View>
          <View style={styles.right}>
            <View style={styles.rightInfos}>{genres}</View>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 280,
    borderWidth: "2px",
    borderColor: "#000000",
  },
  topContainer: {
    width: "100%",
    height: "55%",
  },
  topContainerInfos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    width: "12%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
  },
  details: {
    height: "45%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },
  left: {
    height: "100%",
    width: "50%",
  },
  leftInfos: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 5,
    paddingVertical: 3,
  },
  right: {
    height: "100%",
    width: "50%",
  },
  rightInfos: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
