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
    if (i <= 3) {
      return <TagGenre key={i} genre={data} />;
    } 
    
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.totalContainer}>
        <ImageBackground
          style={{ flex: 1, }}
          source={{uri: props.url}}
          resizeMode='cover'
        >
          <View style={styles.topContainer}>
            <View style={styles.topContainerInfos}>
              <Text style={styles.title}>{props.name}</Text>
            </View>
          </View>
          <View style={styles.details}>
            <View style={styles.left}>
              <View style={styles.leftInfos}>

                <View style={styles.iconTextContainer}>
                  <FontAwesome name="map-pin" color="purple" size={20} />
                  <Text style={styles.textevent}>{props.venue}</Text>
                </View>

                <View style={styles.iconTextContainer}>
                  <FontAwesome name="calendar" color="purple" size={20} />
                  <Text style={styles.textevent}>{props.date}</Text>
                </View>


                <View style={styles.iconTextContainer}>
                  <FontAwesome name="clock-o" color="purple" size={20} />
                  <Text style={styles.textevent}>
                    {props.timeStart} - {props.timeEnd}
                  </Text>
                </View>

                <View style={styles.iconTextContainer}>
                  <FontAwesome name="money" color="purple" size={20} />
                  <Text style={styles.textevent}>{props.price}€</Text>
                </View>
              </View>

            </View>
            <View style={styles.right}>
              <View style={styles.rightInfos}>{genres}</View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    borderWidth: "2px",
    borderColor: "#000000",
    backgroundColor: "black"
  },
  totalContainer: {
    width: "95%",
    borderRadius: 20,
    height: 240,
    overflow: "hidden",
    marginVertical: 10,
    alignSelf:'center'
  },
  topContainer: {
    width: "100%",
    height: "55%",
  },
  topContainerInfos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30
  },

  iconTextContainer: {
    display: "flex",
    flexDirection: 'row',
  },

  textevent: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 15,

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
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 10,
  },
  details: {
    height: "45%",
    display: "flex",
    flexDirection: "row",
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
    marginLeft: 15,
    paddingVertical: 3,
  },
  right: {
    height: "100%",
    width: "50%",
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between'

  },
  rightInfos: {
    // height: "100%",
    width: '100%',
    flexWrap: 'wrap',
    alignItems: "center",
    justifyContent: "center",

  },
});
