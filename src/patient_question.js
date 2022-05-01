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

export default function Patient_question({ navigation }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scoreScreen, setScoreScreen] = useState(false);
  const [score, setScore] = useState(0);

  const update_page = (answer_clicked) => {
    //if there are still questions
    if (currentQuestion < Question_sets.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
    //we show the score screen
    else {
      setScoreScreen(true);
    }

    if (answer_clicked == true) {
      setScore(score + 1);
    }
  };
  const click_answer = (answer_clicked) => {
    //if answer is correct, we increase the score
    if (answer_clicked == true) {
      Alert.alert("correct !", "correct", [
        {
          text: "ok",
          onPress: () => update_page(answer_clicked),
        },
      ]);
    } else {
      Alert.alert("Incorrect !", "incorrect", [
        {
          text: "ok",
          onPress: () => update_page(answer_clicked),
        },
      ]);
    }
  };

  //restore everything
  const try_again = () => {
    setScoreScreen(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  const update = () => {
    db.collection("score")
      .doc(auth.currentUser.email)
      .set({
        score: score,
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        hours: new Date().getHours(),
        min: new Date().getMinutes(),
        username: auth.currentUser.email,
      })
      .then(() => {
        console.log("Score updated!");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });

    navigation.navigate("Patient_Content");
  };

  const [loaded] = useFonts({
    Sans: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstLayer}>
        <Text style={styles.title}> Question</Text>
      </View>
      <View>
        {/* This will make choices to render different screens */}
        {!scoreScreen ? (
          <View>
            <Text style={styles.question}>
              {Question_sets[currentQuestion].question}
            </Text>
            <View style={styles.answer}>
              {Question_sets[currentQuestion].options.map((option, index) => (
                <Pressable
                  style={styles.choiceList}
                  onPress={() => click_answer(option.isAns)}
                >
                  <Text style={styles.buttonText}>{option.text}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.question}>
              You got {score} out of {Question_sets.length}
              <View>
                <Pressable style={styles.choiceList} onPress={try_again}>
                  <Text style={styles.buttonText}>Try again</Text>
                </Pressable>
                <Pressable style={styles.choiceList} onPress={update}>
                  <Text style={styles.buttonText}>Exit</Text>
                </Pressable>
              </View>
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
