import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { storage, firebase, auth } from "../firebase";

export default function Add_photo({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState(null);

  const select_image = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.cancelled) {
      setImage(res.uri);
    }
  };

  const postImage = async () => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    handle_submission(blob);
  };

  const handle_submission = (blob) => {
    //this creates a new file with name based on CURRENT TIME in storage database
    const ref = storage.ref().child(new Date().toISOString());
    const snapshot = ref.put(blob);

    snapshot.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log(error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("download url : ", url);
          firebase
            .firestore()
            .collection("album")
            .add({
              user: auth.currentUser.email,
              Url: url,
              Description: description,
            })
            .then(() => {
              setImage(url);
            });
          blob.close();

          Alert.alert(
            "Upload Successfully!",
            "The image and description have been upload Successfully!"
          );
          setDescription("");

          return url;
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={{ width: "90%", height: 250 }} />

      <View style={styles.describeWrapper}>
        <TextInput
          style={styles.describe}
          placeholder="Enter the description"
          multiline={true}
          onChangeText={setDescription}
          value={description}
        ></TextInput>
      </View>
      <Pressable style={styles.button} onPress={select_image}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      {!uploading ? (
        <Pressable style={styles.button} onPress={postImage}>
          <Text style={styles.buttonText}>upload</Text>
        </Pressable>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    justifyContent: "center",
  },

  describeWrapper: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CCFFCC",
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginTop: 40,
    marginBottom: 20,
  },

  describe: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
    textAlign: "center",
    width: "90%",
  },

  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 100,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
