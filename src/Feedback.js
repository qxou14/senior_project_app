import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";

export default function Feedback(props) {
  //the user have submit their feedback, at first it is false
  const [enter, setEnter] = useState(false);
  const [MSG, setMSG] = useState("");

  const handle_enter = () => {
    setEnter(true);
    let key = auth.currentUser.email + new Date().toISOString();
    db.collection("Feedback")
      .doc(key)
      .set({
        username: auth.currentUser.email,
        message: MSG,
      })
      .then(() => {
        console.log("Feedback written !");
      })
      .catch((error) => {
        console.log("Feedback Error: ", error);
      });
  };
  return (
    <View style={styles.container}>
      {!enter ? (
        <View>
          <TextInput
            placeholder="Enter Feedback Here"
            onChangeText={(msg) => setMSG(msg)}
          />
          <Pressable style={styles.buttonAlbum} onPress={handle_enter}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text>Thank you for your feedback !</Text>
        </View>
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
  TextInput: {
    fontWeight: "bold",
    height: 50,
    flex: 1,
    padding: 40,
    fontSize: 15,
  },
});
