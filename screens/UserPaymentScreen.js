import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { emptyEventToPurchase, eventsPurchased } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserPaymentScreen({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");

  const [event, setEvent] = useState([]);
  const [token, setToken] = useState("");

  const eventToPurchase = useSelector(
    (state) => state.user.value.eventToPurchase
  );
  const userToken = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch();

  useEffect(() => {
    setEvent([eventToPurchase]);
    setToken(userToken);
  }, []);

  const formatCreditCardNumber = (inputValue) => {
    let formattedValue = inputValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let cardNumberArr = [];

    for (let i = 0; i < formattedValue.length; i += 4) {
      cardNumberArr.push(formattedValue.slice(i, i + 4));
    }
    return cardNumberArr.join(" ");
  };

  const formatExpiryDate = (inputValue) => {
    let formattedValue = inputValue.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    let expiryDateArr = [];

    for (let i = 0; i < formattedValue.length; i += 2) {
      expiryDateArr.push(formattedValue.slice(i, i + 2));
    }
    return expiryDateArr.join("/");
  };

  function handlePaymentValidationClick() {
    console.log("[PAYMENT PAGE event]", event[0]);

    fetch("https://meloquest-backend.vercel.app/events/purchased", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: event[0].event_id,
        token: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(eventsPurchased(event[0]));
          navigation.navigate("UserValidation");
        } else {
          console.log("Unable to validate payment");
        }
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowBack}
        >
          <FontAwesome name="arrow-circle-left" color="#ffffff" size={30} />
        </TouchableOpacity>
        <Image
          style={styles.logo}
          source={require("../assets/logo_meloQsmall.png")}
        ></Image>

        <View style={styles.topContainer}>
          <Text style={styles.title}>Paiement par carte</Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setName(value)}
            value={name}
            placeholder="Nom"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(value) => setSurname(value)}
            value={surname}
            placeholder="Prénom"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(value) =>
              setCardNumber(formatCreditCardNumber(value))
            }
            value={cardNumber}
            placeholder="Numéro de carte"
          />

          <View style={styles.bottomFormContainer}>
            <TextInput
              style={styles.textInputExpirationDate}
              onChangeText={(value) => setExpiryDate(formatExpiryDate(value))}
              value={expiryDate}
              placeholder="Date d'expiration"
            />
            <TextInput
              style={styles.textInputCvc}
              onChangeText={(value) => setCvc(value)}
              value={cvc}
              placeholder="CVC"
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => handlePaymentValidationClick()}
            style={styles.validationContainer}
          >
            <Text style={styles.validationText}>Valider le paiement</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  topContainer: {
    flex: 1,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    height: 225,
    width: 225,
    objectFit: "contain",
    alignSelf: "center",
  },
  arrowBack: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 15,
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 28,
    padding: "3%",
    color: "white",
  },
  formContainer: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
    gap: 40,
    width: "100%",
  },
  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    paddingLeft: 15,
  },
  textInputExpirationDate: {
    width: "60%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    paddingLeft: 15,
  },
  textInputCvc: {
    width: "30%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    paddingLeft: 15,
    marginLeft: 10,
  },
  bottomFormContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottomContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  validationContainer: {
    height: 50,
    width: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 15,
  },
  validationText: {
    alignSelf: "center",
  },
});
