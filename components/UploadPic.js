import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Button from "./Button";
import ImageViewer from "./ImageViewer";
import { View, PlaceholderImage, TouchableOpacity } from "react-native";

export default function UploadPic(props) {

  const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
      // console.log(result);
       setSelectedImage(result.assets[0].uri);
      props.getPhoto(result.assets[0].uri)
    } else {
        alert("You did not select any image.");
    }
 };

  return (
    <View>
        <View>
            <ImageViewer placeholderImageSource={PlaceholderImage}selectedImage={selectedImage}></ImageViewer>
            </View>
            <TouchableOpacity onPress={pickImageAsync}>
              <Button theme="primary" label="Choose a photo" />
            </TouchableOpacity>
              </View>
  )
}
