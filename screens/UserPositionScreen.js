import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import { Dropdown } from 'react-native-element-dropdown';

import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';

export default function UserPositionScreen({navigation}) {

  const [cities, setCities] = useState([]);
  const [value, setValue] = useState(null);


  useEffect(() => {
    fetch('https://meloquest-backend.vercel.app/events/cities')
    .then(response => response.json())
    .then(data => {      
        setCities(data.cities);
      });
  }, []);


  return (
<SafeAreaView style={styles.container}>
    <ImageBackground source={require('../assets/photobleue.jpg')} style={styles.background}>
        <View style={styles.containertwo}>
            <Text style={styles.title}>Configure ta position</Text>
        </View>
    <View style={styles.allbtn}>
        <TouchableOpacity onPress={() => navigation.navigate('UserTabNavigator')} style={styles.btnone}>
            <Text style={styles.btnonetext}>Utiliser ma position</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.globaldropdown}>
      <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={cities}
            search
            // maxHeight={550}
            labelField="city"
            valueField="value"
            placeholder="Recherchez par ville"
            searchPlaceholder="Search..."
            value={value}
            onChange={city => {
            setValue(city.value);
            }}
        />
    </View>
        
    </ImageBackground>
</SafeAreaView>
  )
}
const styles = StyleSheet.create({
container: {
    flex: 1,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  containertwo: {
    marginTop: "10%",
  },
  title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    padding: "3%",
    backgroundColor: "#ffffff",
    borderWidth: 1
  },
  map: {
    width: '95%',
    height: '50%',
    alignSelf: "center",
    marginTop: "5%",
  },
  btnone:{
    borderWidth: 1,
    borderRadius: "25%",
    backgroundColor: "#4C32CC",
    marginLeft: "25%",
    marginRight: "25%",
    padding: "5%", 
    marginTop: "10%",
    marginBottom: "10%"
  },

  btnonetext:{
    textAlign: "center",
    color: "white"
  },
  globaldropdown:{
    backgroundColor: "white"
  },
  dropdown: {
    marginLeft: "3%",
    marginRight: "3%",
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})

