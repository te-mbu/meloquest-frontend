// ...rest of the import statements remain unchanged
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import Button from './Button';
import ImageViewer from './imageViewer';


export default function UploadPhoto() {

const [selectedImage, setSelectedImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  }
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <ImageViewer
                placeholderImageSource={PlaceholderImage}
                selectedImage={selectedImage}
        />
        </View>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
    </View>
  );
}
 
  

  // ...rest of the code remains same
