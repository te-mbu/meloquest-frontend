import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Modal,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DatePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// genre
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Rock", value: "rock" },
  { label: "Pop", value: "pop" },
  { label: "Hip Hop", value: "hiphop" },
];
///////////////

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default function OrgaCreateEventScreen() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(null);
  const [venue, setVenue] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [timeStart, setTimeStart] = useState(new Date());
  const [dateInput, setDateInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [timeEnd, setTimeEnd] = useState(new Date());
  const [dateInputtwo, setDateInputtwo] = useState(false);
  const [isDatePickerVisibletwo, setDatePickerVisibilitytwo] = useState(false);

  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  // DESCRIPTION STYLES

  const descriptionContainerStyles = {
    borderRadius: 5,
    marginTop: isMultiSelectOpen ? 200 : 30,
    height: 80,
    width: "90%",
    backgroundColor: "#ffffff",
  };

  // TIME START
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTimeStart(date);
    hideDatePicker();
    setDateInput(true);
  };

  function addTwoHours(date) {
    const newDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);
    return newDate;
  }

  // TIME END
  const showDatePickertwo = () => {
    setDatePickerVisibilitytwo(true);
  };

  const hideDatePickertwo = () => {
    setDatePickerVisibilitytwo(false);
  };

  const handleConfirmtwo = (date) => {
    setTimeEnd(date);
    hideDatePickertwo();
    setDateInputtwo(true);
  };

  // On Click delete item
  function handleDeleteItem(item) {
    setGenres(
      genres.filter((value) => value !== item.replace(/\s/g, "").toLowerCase())
    );
  }

  const handleEventCreation = () => {
    fetch("https://meloquest-backend.vercel.app/users/eventcreation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        timeStart: addTwoHours(timeStart),
        timeEnd: addTwoHours(timeEnd),
        street: address,
        city: city,
        price: price,
        venue: venue,
        description: description,
        genre: genres,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log("Event added to the database");
        } else {
          console.log("[eventCreation] failed");
        }
      });
  };

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBackgroundContainer}
        source={require("../assets/photoblanche.png")}
      >
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
          >
            {/* CREER UN EVENEMENT */}
            <View style={styles.topContainer}>
              <Text style={styles.title}>Créer un évènement</Text>
            </View>

            {/* NOM DE L'EVENEMENT */}
            <View style={styles.nameInputContainer}>
              <TextInput
                style={[styles.textInput, styles.nameInput]}
                onChangeText={(value) => setName(value)}
                placeholder="Nom de l'évènement"
              />
            </View>

            {/* FORM */}

            <View style={styles.formContainer}>
              <View style={styles.leftForm}>
                {/* TIME START */}
                <View style={styles.selectView}>
                  <TouchableOpacity onPress={showDatePicker}>
                    {dateInput ? (
                      <Text style={styles.buttonDateText}>
                        {timeStart.toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    ) : (
                      <Text style={styles.buttonDateText}>
                        Date / Heure de début
                      </Text>
                    )}
                  </TouchableOpacity>

                  <Modal
                    transparent={true}
                    visible={isDatePickerVisible}
                    onRequestClose={hideDatePicker}
                  >
                    <DateTimePickerModal
                      date={timeStart}
                      isVisible={isDatePickerVisible}
                      mode="datetime"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </Modal>
                </View>

                {/* TIME END */}

                <View style={styles.selectView}>
                  <TouchableOpacity onPress={showDatePickertwo}>
                    {dateInputtwo ? (
                      <Text style={styles.buttonDateText}>
                        {timeEnd.toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Text>
                    ) : (
                      <Text style={styles.buttonDateText}>
                        Date / Heure de fin
                      </Text>
                    )}
                  </TouchableOpacity>

                  <Modal
                    transparent={true}
                    visible={isDatePickerVisibletwo}
                    onRequestClose={hideDatePickertwo}
                  >
                    <DateTimePickerModal
                      // Add 2 hours to the date
                      date={new Date(timeEnd.getTime() + 2 * 60 * 60 * 1000)}
                      isVisible={isDatePickerVisibletwo}
                      mode="datetime"
                      onConfirm={handleConfirmtwo}
                      onCancel={hideDatePickertwo}
                    />
                  </Modal>
                </View>

                {/* PRICE */}
                <TextInput
                  onChangeText={(value) => setPrice(value)}
                  value={price}
                  style={styles.textInput}
                  placeholder="Price"
                />
              </View>
              <View style={styles.rightForm}>
                {/* NOM DU LIEU */}
                <TextInput
                  onChangeText={(value) => setVenue(value)}
                  value={venue}
                  style={styles.textInput}
                  placeholder="Nom du lieu"
                />

                {/* VILLE */}
                <TextInput
                  onChangeText={(value) => setCity(value)}
                  value={city}
                  style={styles.textInput}
                  placeholder="Ville"
                />

                {/* ADRESSE */}
                <TextInput
                  onChangeText={(value) => setAddress(value)}
                  value={address}
                  style={styles.textInput}
                  placeholder="Adresse"
                />
              </View>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.genreContainer}>
                {/* GENRES */}

                <MultiSelect
                  style={styles.dropdown}
                  maxHeight={150}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  onFocus={() => setIsMultiSelectOpen(true)}
                  onBlur={() => setIsMultiSelectOpen(false)}
                  items={filteredData}
                  data={data}
                  labelField="label"
                  valueField="value"
                  placeholder="Select a genre"
                  value={genres}
                  search
                  searchPlaceholder="Search..."
                  onChange={(item) => {
                    setGenres(item);
                  }}
                  onChangeInput={(text) => setSearchTerm(text)}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  renderItem={renderItem}
                  renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity
                      onPress={() => unSelect && unSelect(item)}
                    >
                      <View style={styles.selectedStyle}>
                        <Text style={styles.textSelectedStyle}>
                          {item.label}
                        </Text>
                        <FontAwesome
                          key={item.label}
                          onPress={() => handleDeleteItem(item.label)}
                          color="#000000"
                          name="trash"
                          size={17}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>

              {/* DESCRIPTION */}
              <View style={descriptionContainerStyles}>
                <TextInput
                  onChangeText={(value) => setDescription(value)}
                  value={description}
                  placeholder="Entrez votre description"
                />
              </View>

              {/* UPLOAD D'IMAGE */}
              <View style={styles.uploadContainer}>
                <TouchableOpacity style={styles.uploadButton}>
                  <Text style={styles.upload}>Upload Image</Text>
                </TouchableOpacity>
                <View style={styles.share}>
                  <FontAwesome name="plus" color="#ffffff" />
                </View>
              </View>

              {/* CREER L'EVENEMENT */}
              <TouchableOpacity
                onPress={() => handleEventCreation()}
                style={styles.createEventContainer}
              >
                <Text style={styles.createEventText}>Créer l'évènement</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackgroundContainer: {
    resizeMode: "cover",
  },
  topContainer: {
    height: 80,
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
  formContainer: {
    height: 230,
    display: "flex",
    flexDirection: "row",
  },
  leftForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "100%",
    borderRightWidth: "2px",
    borderRightColor: "#ffffff",
  },
  rightForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    height: "100%",
  },
  nameInputContainer: {
    height: 80,
    paddingTop: 15,
  },
  nameInput: {
    marginBottom: 15,
    alignSelf: "center",
  },

  textInput: {
    width: "80%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    textAlign: "center",
  },

  bottomContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
  },

  genreContainer: {
    marginTop: 30,
    width: "80%",
  },

  uploadContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "50%",
  },
  uploadButton: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  upload: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  createEventContainer: {
    backgroundColor: "#ffffff",
    marginRight: 30,
    borderRadius: 15,
    marginTop: 20,
  },
  createEventText: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  buttonDateText: {
    color: "#000000",
    textAlign: "center",
  },
  selectView: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
  dropdown: {
    marginLeft: "3%",
    marginRight: "3%",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },

  // genre
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  // ///////////
});
