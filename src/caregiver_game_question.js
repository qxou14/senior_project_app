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

export default function C_question({ navigation }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const ref = db.collection("questions");
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        objs.push({
          key: doc.id,
          Question: doc.data().question,
        });
      });
      setQuestions(objs);
    });
  }, []);

  const ListItem = ({ questions }) => {
    return (
      <View>
        <View>
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {questions.Question}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>This is for question</Text>
      {console.log(questions)}
      <FlatList
        data={questions}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <ListItem questions={item} />}
      />
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
