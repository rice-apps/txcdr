import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { Pressable, View, Text, Image, StyleSheet } from "react-native";

export function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  // setImage(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setImage(result.uri);
    if (!result.canceled) {
      // setImage('./assets/hydrangea.png');
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      {/* <View style={styles.profileImageContainer}></View> */}
      {image && <Image source={{ uri: image }} style={[styles.profileImageContainer]} />}
      <Pressable 
        className="editProfileButton"
        onPress={pickImage}
      >
        <Text>Upload</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: 'rgba(217, 217, 217, 1)',
    marginLeft: 165,
  },
});