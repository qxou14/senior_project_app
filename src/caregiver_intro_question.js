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
    //select which screen we are going to
    if (!ready) {
      navigation.navigate("question");
    } else {
      navigation.navigate("question_ans");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        This page gives an introduction of the game.
      </Text>
      <Pressable style={styles.button} onPress={load}>
        <Text style={styles.buttonText}>Ok</Text>
      </Pressable>
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
  topWrapper: {},

  title: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 30,
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
