import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    backgroundColor
} from 'react-native';


export default function FirstPageScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={require('../assets/logo_meloQ.png')} style={styles.background}>
                <View style={styles.imageContainer}>
                    <Text style={styles.catchphrase}>Explorer la musique autrement</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Role')} style={styles.button} activeOpacity={0.8}>
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
        backgroundColor:'#262626'
    },
    imageContainer:{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    catchphrase: {
        position: 'absolute',
        bottom:0,
        fontSize: 40,
        fontWeight: '600',
        marginBottom: 120,
        alignItems: 'center',
        color: 'white'
    },

    button: {
        position:'absolute',
        bottom:0,
        alignItems: 'center',
        paddingTop: 9,
        width: '100%',
        marginBottom:30,
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

