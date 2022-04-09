import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";

const { Question_sets } = require("./Question_sets/question_list");
const disensions = Dimensions.get("screen");

export default function score({ navigation }) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
  },
  firstLayer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
    marginTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Sans",
  },

  question: {
    fontSize: 26,
    fontSize: 30,
    marginBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Sans",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 35,
  },

  answer: {
    alignItems: "center",
    justifyContent: "center",
  },

  choiceList: {
    marginTop: 20,
    backgroundColor: "#E6EAE4",
    height: 125,
    width: "46%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    height: disensions.height * 0.1,
    width: disensions.width * 0.8,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    marginTop: 5,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
  },
});
