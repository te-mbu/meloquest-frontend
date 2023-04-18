import React from 'react'
import {
    Pressable,
    View,
    StyleSheet,
} from "react-native";

export default function Button({ label,  theme, onPress}) {
    if (theme === "primary") {
      return (
        <View>
          <Pressable
            style={[styles.button, { backgroundColor: '#fff' }]}
            onPress={onPress}
          >
        </Pressable>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    button:{
        borderWidth: 1
    }
  })