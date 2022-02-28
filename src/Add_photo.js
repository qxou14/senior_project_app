import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { storage, firebase } from "../firebase";

export default function Add_photo({ navigation }) {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState("");

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
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text>hey siri</Text>
      <Pressable style={styles.button} onPress={select_image}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />

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
    padding: 0,
  },

  logo: {
    width: 200,
    height: 200,
  },

  title: {
    color: "#0081A7",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 60,
  },

  button: {
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
