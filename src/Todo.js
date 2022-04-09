import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { SafeAreaView } from "react-native-safe-area-context";
import Foundation from "react-native-vector-icons/Foundation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

Foundation.loadFont();
MaterialIcons.loadFont();
const disensions = Dimensions.get("screen");

export default function Todo({ navigation }) {
  const [Item, setItem] = useState([]);
  const [currentDate, setcurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    setcurrentDate(month + '/' + date + '/' + year);

    const ref = db
      .collection("Todo")
      .where("username", "==", auth.currentUser.email);
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        objs.push({
          key: doc.id,
          Action: doc.data().Action,
          Time: doc.data().Time,
          check: doc.data().check,
        });
      });
      setItem(objs);
    });
  }, []);

  const check_box = (id, original, action, time) => {
    // console.log("box is clicked");
    // console.log(id);
    // console.log(original);
    // console.log(!original);
    // console.log("------");
    db.collection("Todo").doc(id).set({
      username: auth.currentUser.email,
      Action: action,
      Time: time,
      check: !original,
    });
  };

  const ListItem = ({ todo }) => {
    return (
      <View>
        <View style={styles.listItem}>
          <View style={styles.leftitem}>
            <Pressable
              onPress={() => {
                check_box(todo.key, todo.check, todo.Action, todo.Time);
              }}
            >
              <Checkbox style={styles.checkbox} disabled value={todo.check} />
            </Pressable>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {todo.key}{" "}
            </Text>
          </View>

          <View style={styles.rightitem}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                textDecorationLine: todo?.check ? "line-through" : "none",
              }}
            >
              {todo.Action}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Foundation name="calendar" size={56} style={styles.calendar} />
        <View style={styles.dataWrapper}>
          <MaterialIcons name="keyboard-arrow-left" size={46} />
          <Text style={styles.dateStyle}> {currentDate} </Text>
          <MaterialIcons name="keyboard-arrow-right" size={46} />
        </View>
      </View>

      <FlatList
        data={Item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    padding: 0,
  },

  topContainer: {
    height: disensions.height / 4,
    width: disensions.width,
    alignContent: "center",
    justifyContent: "center",
  },

  dataWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dateStyle: {
    fontWeight: "bold",
    fontSize: 35,
  },
  calendar: {
    textAlign: "center",
  },

  listItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    width: disensions.width * 0.9,
    height: disensions.height / 10,
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 12,
    borderRadius: 10,
    marginVertical: 20,
  },

  leftitem: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 15,
  },
});
