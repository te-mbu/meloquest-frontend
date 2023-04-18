import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';


export default function FirstPageScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/photobleue.jpg')} style={styles.background}>

                <View style={styles.container}>
                    <Text style={styles.catchphrase}>Explorer la musique autrement</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.button} activeOpacity={0.8}>
                        <Text style={styles.textButton}>Démarrer</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    catchphrase: {
        position: 'absolute',
        fontSize: 40,
        fontWeight: '600',
        marginBottom: 20,
        alignItems: 'center',
        color: 'white'
    },

    button: {
        alignItems: 'center',
        paddingTop: 8,
        width: '100%',
        marginTop: 450,
        backgroundColor: 'white',
        borderRadius: 16,



    },

    background: {
        flex: 1,
        width: '100%',
        borderBottom: 'none'
    },

    textButton: {

        height: 30,
        fontWeight: '600',
        fontSize: 16,
        backgroundColor: "white",

    }
})

