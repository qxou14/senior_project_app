import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../firebase";
import Input_button from "./Input_button";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import React, { useEffect, useState } from "react";

Feather.loadFont();
MaterialCommunityIcons.loadFont();

export default function Question_intro({ navigation }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let ref = db.collection("set_question").doc(auth.currentUser.email);
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Doc data: ", doc.data().ready);
          setReady(doc.data().ready);
        } else {
          console.log("no such document");
        }
      })
      .catch((error) => {
        console.log("error getting doc : ", error);
      });
  }, []);

  const load = () => {
    console.log("load question page");
    console.log(ready);

    if (!ready) {
      navigation.navigate("question");
    } else {
      navigation.navigate("question_ans");
    }
  };
  return (
    <View style={styles.container}>
      <Text>This page gives an introduction of the game.</Text>
      <Pressable style={styles.buttonAlbum} onPress={load}>
        <Text style={styles.buttonText}>Ok</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6EAE4",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 40,
    alignItems: "center",
    paddingHorizontal: 40,
  },

  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginTop: 180,
    marginLeft: 15,
    marginRight: 15,
  },

  SecondLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginLeft: 15,
    marginRight: 15,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonAlbum: {
    alignItems: "center",
    backgroundColor: "#FFFF9B",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonMaps: {
    alignItems: "center",
    backgroundColor: "#A5DAFE",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonFeedback: {
    alignItems: "center",
    backgroundColor: "#FFDE6D",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonSchedule: {
    alignItems: "center",
    backgroundColor: "#CCFFCC",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
  },
});
