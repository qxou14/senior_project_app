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
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import { useFonts, 
         Montserrat_400Regular,
         Montserrat_500Medium,
         Montserrat_600SemiBold,
         Montserrat_700Bold,
        } from '@expo-google-fonts/montserrat';

Foundation.loadFont();
MaterialIcons.loadFont();
const dimensions = Dimensions.get("screen");

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
          </View>

          <View style = {styles.middleitem}>
            <Text
              style={{
                fontFamily: "Montserrat_600SemiBold",
                fontSize: 20,
                textDecorationLine: todo?.check ? "line-through" : "none",
              }}>
              {todo.Action}{" "}
            </Text>
          </View>

          <View style={styles.rightitem}>
            <Text style={{fontSize: 18, fontFamily: "Montserrat_600SemiBold" }}>
              {todo.key}{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>

      <LinearGradient
        // Background Linear Gradient
        colors={["#f5fcfe", "#b1e5f6"]}
        style={styles.background}
        start = {[0.1, 0.2]}
      />

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
        showsVerticalScrollIndicator={true}
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

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  topContainer: {
    height: dimensions.height / 4,
    width: dimensions.width,
    alignContent: "center",
    justifyContent: "center",
  },

  dataWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  dateStyle: {
    fontSize: 30,
    fontFamily: "Montserrat_500Medium",
  },
  calendar: {
    textAlign: "center",
  },

  listItem: {
    padding: 20,
    backgroundColor: "white",
    flexDirection: "row",
    width: dimensions.width * 0.9,
    height: dimensions.height / 8,
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

  middleitem: {
    width: "55%",
  },

  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 15,
  },
});
