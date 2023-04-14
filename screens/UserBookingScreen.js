import React from 'react';
import EventL from "../components/EventL"
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';


export default function UserBookingScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.maincontainer}>
            <EventL />
            <View style={styles.container}>
                <View style={styles.sectionone}>
                    <TouchableOpacity style={styles.round}>
                        <Text style={styles.roundstyle}> - </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.square}>
                        <Text> 1 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.round}>
                        <Text style={styles.roundstyle}> + </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectiontwo}>
                    <TouchableOpacity style={styles.styleprice}>
                        <Text style={styles.textprice}> 35€ </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionthree}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserPayment')} style={styles.stylebtn}>
                        <Text style={styles.textbtn}> Allez zou ! A la caisse ! </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
    },
    container: {
        backgroundColor: "black",
        flex: 1,
    },
    sectionone: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 10,
    },
    round: {
        borderWidth: 1,
        borderRadius: "50%",
        padding: 5,
        backgroundColor: "#4C32CC",
    },
    roundstyle: {
        color: "white"
    },
    square: {
        borderWidth: 1,
        padding: 5,
        backgroundColor: "#FFC54B"
    },
    styleprice: {
        borderWidth: 1,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: "50%",
        padding: 5,
        backgroundColor: "#4C32CC"
    },
    textprice: {
        textAlign: "center",
        color: "white"
    },
    sectiontwo: {
        marginBottom: 10,
        flex: 1,
    },
    stylebtn: {
        borderWidth: 1,
        alignItems: "center",
        marginLeft: 25,
        marginRight: 25,
        padding: 5,
        borderRadius: "50%",
        backgroundColor: "#4C32CC",
    },
    textbtn: {
        color: "white"
    },
    sectionthree: {
        flex: 1,
        marginBottom: 5
    },
})


