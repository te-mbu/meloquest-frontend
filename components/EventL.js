import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';


export default function EventL() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
      <View>
        <Image source={require('../assets/paiement.jpg')} style={styles.background}/>
      </View>
      <View style={styles.bordertext}>
        <Text style={styles.text}>Artiste : Electronica</Text>
        <Text style={styles.text}>Lieu : Bataclan</Text>
        <Text style={styles.text}>Quand ? 17 juillet | 20h30</Text>
      </View>
      </View>
      
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        height: 550,
        backgroundColor: 'black',
      },
      background: {
        width: '100%',
        marginBottom: 40,

      },
      text: {
        color: "black",
        textAlign: "center",
        padding: 10,
      },
      bordertext: {
        borderWidth: 1,
        backgroundColor: "white",
        marginLeft: 20,
        marginRight:20,
        borderRadius: 7
      }
     })
