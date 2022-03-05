import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";

const disensions = Dimensions.get("screen");

export default function Todo_Giver({ navigation }) {
  const [Item, setItem] = useState([]);
  const [time, setTime] = useState(0);
  const [action, setAction] = useState("");

  useEffect(() => {
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
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {todo.key}{" "}
            </Text>
          </View>

          <View style={styles.rightitem}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {todo.Action}{" "}
            </Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={() => {
              delete_info(todo.key);
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.inputWrapper}>
          <View style={styles.TimeinputView}>
            <TextInput
              placeholder="Time"
              placeholderTextColor="green"
              style={styles.TextInput}
              onChangeText={(time) => setTime(time)}
            />
          </View>

          <View style={styles.task}>
            <View style={styles.ActionInputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Action"
                placeholderTextColor="green"
                onChangeText={(action) => setAction(action)}
              />
            </View>
          </View>
        </View>

        <View style={styles.inputButton}>
          <Pressable style={styles.button} onPress={add_info}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.taskWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Assigned Task List</Text>
        </View>

        <View style={styles.taskList}>
          <FlatList
            data={Item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => <ListItem todo={item} />}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },

  topWrapper: {
    height: disensions.height / 4,
    width: disensions.width,
    backgroundColor: "#BEDEBE",
    alignContent: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  TimeinputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    width: disensions.width / 4,
    height: disensions.height / 14,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  ActionInputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    width: disensions.width / 1.5,
    height: disensions.height / 14,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  inputButton: {
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#23A6F0",
    borderRadius: 40,
    width: disensions.width / 5,
    height: disensions.height / 15,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  taskWrapper: {
    backgroundColor: "#c8d6c1",
    width: disensions.width,
    height: disensions.height - disensions.height / 4,
  },

  titleWrapper: {
    alignItems: "center",
    marginTop: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
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

  taskList: {
    marginTop: 20,
    alignItems: "center",
  },
});
