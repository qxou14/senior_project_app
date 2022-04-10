import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";
import { auth, db } from "../firebase";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";

export default function View_Score({ navigation }) {
  const [score, setScore] = useState(0);
  const [date, setDate] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);

  useEffect(() => {
    const ref = db
      .collection("score")
      .where("username", "==", auth.currentUser.email);
    ref.onSnapshot((query) => {
      query.forEach((doc) => {
        setScore(doc.data().score);
        setDate(doc.data().date);
        setMonth(doc.data().month);
        setYear(doc.data().year);
        setHours(doc.data().hours);
        setMin(doc.data().min);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Previous Score: {score}</Text>
      <Text></Text>

      <Text>
        Previous time attempted: {year}/{month}/{date}, {hours}:{min}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 20,
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 40,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    height: 125,
    width: "46%",
    justifyContent: "center",
    borderRadius: 35,
  },

  iconStyle: {
    marginRight: 40,
  },

  buttonText: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
  },

  left: {
    alignItems: "center",
  },
  right: {
    alignItems: "center",
  },

  leftword: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontFamily: "Sans",
  },
});
