import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

export default function Todo_Giver({ navigation }) {
  const [Item, setItem] = useState([]);
  const [time, setTime] = useState(0);
  const [action, setAction] = useState("");

  useEffect(() => {
    const ref = db.collection("Todo");
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

  const add_info = () => {
    //
    console.log("add_info");
    db.collection("Todo")
      .doc(time)
      .set({
        username: auth.currentUser.email,
        Action: action,
        Time: time,
        check: false,
      })
      .then(() => {
        console.log("Document written !");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const delete_info = (id) => {
    db.collection("Todo")
      .doc(id)
      .delete()
      .then(() => {
        console.log("document deleted");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const check_box = (id, original, action, time) => {
    // console.log("box is clicked");
    // console.log(id);
    // console.log(original);
    // console.log(!original);
    // console.log("------");
    db.collection("Todo").doc(id).set({
      Action: action,
      Time: time,
      check: !original,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Time"
          placeholderTextColor="green"
          onChangeText={(time) => setTime(time)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Action"
          placeholderTextColor="green"
          onChangeText={(action) => setAction(action)}
        />
      </View>
      <Pressable style={styles.button} onPress={add_info}>
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>

      <FlatList
        data={Item}
        renderItem={({ item }) => (
          <Text style={styles.item} key={item.key}>
            <Pressable
              onPress={() => {
                check_box(item.key, item.check, item.Action, item.Time);
              }}
            >
              <Checkbox disabled value={item.check} />
            </Pressable>
            {item.Action}
            {item.key}
            <Pressable
              style={styles.button}
              onPress={() => {
                delete_info(item.key);
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </Text>
        )}
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

  inputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
    width: "75%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
  },

  logo: {
    width: 200,
    height: 200,
  },

  title: {
    color: "#0081A7",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 60,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
