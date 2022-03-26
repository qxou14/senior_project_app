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
} from "react-native";
import React, { useEffect, useState } from "react";

const { Question_sets } = require("./Question_sets/question_list");

export default function Patient_question({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scoreScreen, setScoreScreen] = useState(false);
  const [score, setScore] = useState(0);

  const click_answer = (answer_clicked) => {
    //if there are still questions
    if (currentQuestion < Question_sets.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    //we show the score screen
    else {
      setScoreScreen(true);
    }

    //if answer is correct, we increase the score
    if (answer_clicked == true) {
      setScore(score + 1);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Patient question</Text>

      <View>
        {/* This will make choices to render different screens */}
        {!scoreScreen ? (
          <View>
            <Text>{Question_sets[currentQuestion].question}</Text>
            {Question_sets[currentQuestion].options.map((option, index) => (
              <Pressable onPress={() => click_answer(option.isAns)}>
                <Text style={styles.buttonText}>{option.text}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View>
            <Text>
              You got {score} out of {Question_sets.length}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDF7",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  firstLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
    marginTop: 45,
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

  ThirdLayer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 15,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 35,
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

  buttonAlbums: {
    alignItems: "center",
    backgroundColor: "#FFFF9B",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonGames: {
    alignItems: "center",
    backgroundColor: "#69FFD2",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
  },

  buttonReminders: {
    alignItems: "center",
    backgroundColor: "#ACA4FF",
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

  buttonEmergency: {
    alignItems: "center",
    backgroundColor: "#68D8E7",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
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
