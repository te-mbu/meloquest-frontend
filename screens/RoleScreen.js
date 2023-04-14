import React from 'react';

import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

import { StatusBar } from 'expo-status-bar';


export default function RoleScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/photobleue.jpg')} style={styles.background}>
        <View style={styles.globallayout}>
            <View>
                <Text style={styles.text}>Qui es-tu ?</Text>
            </View>
            <View style={styles.btnlayout}>
                <TouchableOpacity onPress={() => navigation.navigate('OrgaSigninSignup')} style={styles.btnleft} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Un(e) organisateur·trice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('UserSigninSignup')} style={styles.btnright} activeOpacity={0.8}>
                    <Text style={styles.textButton}>Un(e) utilisateur·trice</Text>
                </TouchableOpacity>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
},
  background: {
    width: '100%',
    height: '100%',
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 60,
    backgroundColor: '#FFFFFF',
  },
  globallayout: {
    flexDirection: 'column',
    paddingTop: '100%'
  },
  btnlayout: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 70,
  },
  btnleft: {
    alignItems: 'center',
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
  btnright: {
    alignItems: 'center',
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 2,
  },
 })