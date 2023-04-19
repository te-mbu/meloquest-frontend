import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image
} from 'react-native';


export default function FirstPageScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo_meloQsmall.png')} style={styles.background} />
                <View style={styles.textContainer}>
                    <Text style={styles.catchphrase}>Explorer la musique autrement</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Démarrer</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        display: "flex",

    },
    logo: {
        backgroundColor: "black",
        height: "100%",
        width: "100%"
    },

    background: {
        width: 300,
        height: 300,
        objectFit: "contain",
        alignSelf: "center",
        marginTop: "18%"
    },

    textContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    catchphrase: {
        position: 'absolute',
        bottom: 0,
        fontSize: 40,
        fontWeight: '600',
        marginBottom: "50%",
        alignItems: 'center',
        color: 'white'
    },

    button: {
        position: 'absolute',
        bottom: 0,
        alignItems: 'center',
        paddingTop: 9,
        width: '100%',
        marginBottom: 40,
        backgroundColor: 'white',
        borderRadius: 16,
    },


    textButton: {
        height: 30,
        fontWeight: '600',
        fontSize: 16,
        backgroundColor: "white",

    }
})

