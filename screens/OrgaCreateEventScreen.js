import React, { useState, useEffect } from "react";
import {
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
import { useSelector } from "react-redux";

import { useIsFocused } from "@react-navigation/native";
import UploadPic from "../components/UploadPic";

// genre
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const data = [
  { label: "Rock", value: "rock" },
  { label: "Pop", value: "pop" },
  { label: "Hip Hop", value: "hiphop" },
  { label: "Afrobeat", value: "afrobeat" },
  { label: "Bossa Nova", value: "bossanova" },
  { label: "Flamenco", value: "flamenco" },
  { label: "K-Pop", value: "kpop" },
  { label: "Reggae", value: "reggae" },
  { label: "Salsa", value: "salsa" },
  { label: "Samba", value: "samba" },
  { label: "Tango", value: "tango" },
  { label: "World Fusion", value: "worldfusion" },
  { label: "Celtic", value: "celtic" },
  { label: "Jazz Fusion", value: "jazzfusion" },
  { label: "Reggae Dub", value: "reggaedub" },
  { label: "Electronic Dance Music", value: "edm" },
  { label: "Classical Crossover", value: "classicalcrossover" },
  { label: "Funk", value: "funk" },
  { label: "Blues Rock", value: "bluesrock" },
  { label: "Latin Jazz", value: "latinjazz" },
  { label: "Chiptune", value: "chiptune" },
  { label: "Gypsy Jazz", value: "gypsyjazz" },
  { label: "Klezmer", value: "klezmer" },
  { label: "Nintendocore", value: "nintendocore" },
  { label: "Steampunk Music", value: "steampunk" },
  { label: "Vaporwave", value: "vaporwave" },
  { label: "Zydeco", value: "zydeco" },
  { label: "Neoclassical Darkwave", value: "neoclassicaldarkwave" },
  { label: "Math Rock", value: "mathrock" },
  { label: "Folktronica", value: "folktronica" },
  { label: "Funk carioca", value: "funkcarioca" },
  { label: "Musique gnawa", value: "gnawa" },
  { label: "Musique Touareg", value: "touareg" },
  { label: "Musique Mongole", value: "mongole" },
  { label: "Musique Kora", value: "kora" },
  { label: "Musique Fado", value: "fado" },
  { label: "Musique Klezmer", value: "klezmer" },
  { label: "Musique Andine", value: "andine" },
  { label: "Musique d'Asie centrale", value: "asiacentrale" },
  { label: "Musique des Balkans", value: "balkans" },
  { label: "Musique des Marins", value: "marins" },
  { label: "Musique de la Nouvelle-Orléans", value: "nouvelleorleans" },
  { label: "Musique électroacoustique", value: "electroacoustique" },
  { label: "Musique de la Nouvelle Vague", value: "nouvellevague" },
  { label: "Musique acadienne", value: "acadienne" },
  { label: "Musique Tropicália", value: "tropicalia" },
  { label: "Musique de la Renaissance", value: "renaissance" },
  { label: "Musique de la cour ottomane", value: "courottomane" },
  { label: "Musique traditionnelle irlandaise", value: "irlandaise" },
  { label: "Musique traditionnelle japonaise", value: "japonaise" },
  { label: "Musique traditionnelle chinoise", value: "chinoise" }

];

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;

export default function OrgaCreateEventScreen({ navigation }) {
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
  const [token, setToken] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  const [photo, setPhoto] = useState(null);

  const userToken = useSelector((state) => state.user.value.token);

  const isFocused = useIsFocused();

  useEffect(() => {
    setToken(userToken);
    if (isFocused) {
      // in react-native, isFocused works the same as the useEffect?
      setIsTrue(false);
    }
  }, [isFocused]);

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


  const handleRedirection = () => {
    setModalVisible(false);
    navigation.navigate("Mes events");
  };

  const filteredData = data.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendPicToCloudinary = async () => {
    const formData = new FormData();

    formData.append("photoFromFront", {
      uri: photo,
      name: "photo.jpg",
      type: "image/jpeg",
    });

      fetch(`https://meloquest-backend.vercel.app/sendPic/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result){
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
        url: data.url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setName("");
          setCity("");
          setAddress("");
          setPrice(null);
          setVenue("");
          setDescription("");
          setGenres([]);
          setSearchTerm("");
          setTimeStart(new Date());
          setTimeEnd(new Date());
          setDateInput(false);
          setDateInputtwo(false);
          setDatePickerVisibility(false);
          setDatePickerVisibilitytwo(false);
          setIsMultiSelectOpen(false);
          setModalVisible(true); // pour l'affichage de la modale
          setIsTrue(true); // pour le contenu de la modale
          // ajout du token de l'organisateur dans le tableau 'organiser' de l'event
          fetch("https://meloquest-backend.vercel.app/events/organiser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              event_id: data.event_id,
              token: token,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.result) {
                console.log("Organiser added to event collection");
              } else {
                console.log("Can't add organiser to event collection");
              }
            });
        } else {
          setModalVisible(true); // si les champs ne sont pas remplis, afficher quand même un modale.
        }
      });
        }
      });
  };
  /* fonction intermédiaire qui permet de récupérer la photo */
  function getPhoto(photo) {
    setPhoto(photo);
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.main}>
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
              value={name}
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
                placeholder="Prix"
              />
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
                placeholder="Genre(s)"
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
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                    <View style={styles.selectedStyle}>
                      <Text style={styles.textSelectedStyle}>{item.label}</Text>
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
                style={styles.descriptionText}
                onChangeText={(value) => setDescription(value)}
                value={description}
                placeholder="Entrez votre description"
              />
            </View>

            {/* UPLOAD D'IMAGE */}
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadButton}>
                <UploadPic getPhoto={getPhoto} />
              </TouchableOpacity>
              <View style={styles.share}>
                <FontAwesome name="plus" color="#ffffff" />
              </View>
            </View>

            {/* CREER L'EVENEMENT */}
            <TouchableOpacity
              onPress={() => {
                sendPicToCloudinary();
              }}
              style={styles.createEventContainer}
            >
              <Text style={styles.createEventText}>Créer l'évènement</Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={true}
            >
              <View
                style={{
                  flex: 0.2,
                  backgroundColor: isTrue ? "limegreen" : "crimson",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  height: "15%",
                  width: "100%",
                  position: "absolute",
                  bottom: 0,
                  marginBottom: "20%",
                }}
              >
                {isTrue ? (
                  <>
                    <Text style={{ fontWeight: "bold" }}>
                      Super ! Votre évènement a bien été créé
                    </Text>
                    <TouchableOpacity
                      onPress={() => handleRedirection()}
                      style={styles.trybtn}
                    >
                      <Text style={styles.eventBtnNavigation}>
                        Retour à la case départ
                      </Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View>
                    <Text style={styles.errorText}>
                      Tu as oublié de remplir un ou plusieurs champs !
                    </Text>
                    <TouchableOpacity
                      style={styles.tryButonStyle}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.trybtn}>Réessayer !</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </Modal>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#262626",
  },
  container: {
    flex: 1,
  },
  topContainer: {
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    width: "110%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
    marginBottom: 30
  },
  formContainer: {
    height: 230,
    display: "flex",
    flexDirection: "row",
    marginBottom: 70,
  },
  leftForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: 15,
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
    width: "60%",
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

  descriptionText: {
    padding: 10,
  },

  uploadContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginLeft: 20,
    width: "50%",
  },
  uploadButton: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
  },
  share: {
    marginRight: 30
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
  dropdown: {
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
  errorText: {
    fontWeight: "bold",
  },
  tryButonStyle: {
    borderWidth: 2,
    borderRadius: 35,
    paddingVertical: "3%",
    marginHorizontal: 70,
    marginTop: 10,
  },
  tryText: {
    textAlign: "center",
    fontWeight: "bold",
  },

  eventBtnNavigation: {
    borderWidth: 2,
    borderRadius: 20,
    padding: "3%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "5%",
    fontWeight: "bold",
  },
});
