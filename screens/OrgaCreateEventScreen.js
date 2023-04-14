// import React from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Modal
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import { useState } from 'react';
import DatePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
// import MusicGenre from "../components/MusicGenre"

// genre
import React, { useState } from 'react';
// import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
 

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
///////////////

const BACKEND_ADDRESS = process.env.BACKEND_ADDRESS;


export default function OrgaCreateEventScreen() {

  const [name, setName] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState(null);
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState([]);

  
  const [dateRace, setDateRace] = useState(new Date());
  const [dateInput, setDateInput] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [dateRacetwo, setDateRacetwo] = useState(new Date());
  const [dateInputtwo, setDateInputtwo] = useState(false);
  const [isDatePickerVisibletwo, setDatePickerVisibilitytwo] = useState(false);

// genre
  const [selected, setSelected] = useState([]);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };
//////////////


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  
  const handleConfirm = (date) => {
    setDateRace(date);
    hideDatePicker();
    setDateInput(true)
  };

  const showDatePickertwo = () => {
    setDatePickerVisibilitytwo(true);
  };

  const hideDatePickertwo = () => {
    setDatePickerVisibilitytwo(false);
  };

  const handleConfirmtwo = (date) => {
    setDateRacetwo(date);
    hideDatePickertwo();
    setDateInputtwo(true)
  };

  const handleEventCreation = () => {
   setTimeStart(new Date(dateRace))
   setTimeEnd(new Date(dateRacetwo))
   console.log('genre ->', genre)

      fetch('https://meloquest-backend.vercel.app/users/eventcreation', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          timeStart: timeStart,
          timeEnd: timeEnd,
          street: 'ma street',
          city: city,
          address: address,
          price: price,
          venue: venue,
          description: description,
          // genre: genre,
          genre: ['rock', 'rap'],
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data.result){
      console.log('event added')
    } else {
      console.log('fetch good but false response')
    }
    })}


  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.container}
        source={require("../assets/photoblanche.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.topContainer}>
            <Text style={styles.title}>Créer un évènement</Text>
          </View>
          <View style={styles.nameInputContainer}>
            <TextInput
              style={[styles.textInput, styles.nameInput]}
              placeholder="Nom de l'évènement"
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.leftForm}>
              <View style={styles.selectView}>
                <TouchableOpacity onPress={showDatePicker}>
                   {dateInput ? <Text style={styles.buttonDateText}>{dateRace.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text> : <Text style={styles.buttonDateText}>Date & heure de début</Text>}
               </TouchableOpacity>

                <Modal
                  transparent={true}
                  visible={isDatePickerVisible}
                  onRequestClose={hideDatePicker}
                >
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                </Modal>
              </View>
      <View style={styles.selectView}>
                <TouchableOpacity onPress={showDatePickertwo}>
                   {dateInputtwo ? <Text style={styles.buttonDateText}>{dateRacetwo.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</Text> : <Text style={styles.buttonDateText}>Date & heure de fin</Text>}
               </TouchableOpacity>

                <Modal
                  transparent={true}
                  visible={isDatePickerVisibletwo}
                  onRequestClose={hideDatePickertwo}
                >
                  <DateTimePickerModal
                    isVisible={isDatePickerVisibletwo}
                    mode="datetime"
                    onConfirm={handleConfirmtwo}
                    onCancel={hideDatePickertwo}
                  />
                </Modal>
      </View>

              <TextInput onChangeText={(value) => setCity(value)} value={city} style={styles.textInput} placeholder="Ville" />
              <TextInput onChangeText={(value) => setAddress(value)} value={address} style={styles.textInput} placeholder="Adresse" />
              <TextInput onChangeText={(value) => setPrice(value)} value={price} style={styles.textInput} placeholder="Price" />

            </View>
            <View style={styles.rightForm}>

              <TextInput onChangeText={(value) => setVenue(value)} value={venue} style={styles.textInput} placeholder="Nom du lieu" />
             {/* < MusicGenre /> */}


             <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Select item"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
        }}
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
              <AntDesign color="black" name="delete" size={17} />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>


            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.descriptionContainer}>
              <TextInput onChangeText={(value) => setDescription(value)}  value={description} placeholder="Entrez votre description" />
            </View>
            <View style={styles.uploadContainer}>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.upload}>Upload Image</Text>
              </TouchableOpacity>
              <View style={styles.share}>
                <FontAwesome name="plus" color="#ffffff" />
              </View>
            </View>
            <TouchableOpacity onPress={() => handleEventCreation()} style={styles.createEventContainer}>
              <Text style={styles.createEventText}>Créer l'évènement</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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

  descriptionContainer: {
    borderRadius: 5,
    marginTop: 50,
    height: 80,
    width: "90%",
    backgroundColor: "#ffffff",
  },

  bottomContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  uploadContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    width: '50%'
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
    marginBottom: 15,
  },
  createEventText: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  buttonDateText: {
    color: 'black',
    textAlign: 'center',
  },
  selectView: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#474CCC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  dropdown: {
    marginLeft: "3%",
    marginRight: "3%",
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },


// genre
container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
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
