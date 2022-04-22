import { auth, db } from "../firebase";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";

const dimensions = Dimensions.get("screen");

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

          <View style = {styles.listItemLeftContainer}>

            <View style={styles.listItemTask}>
              <Text style={styles.taskText}>
                {todo.Action}{" "}
              </Text>
            </View>

            <View style={styles.listItemDate}>
              <Text style={styles.dateText}>
                {todo.key}{" "}
              </Text>
            </View>

          </View>
          
          <TouchableHighlight onPress={() => {delete_info(todo.key);}}>
            <Image style = {styles.imageStyle} source = {require("../assets/trash.png")}/>
          </TouchableHighlight>

        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.taskWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Assigned Daily Tasks</Text>
        </View>

        <View style={styles.taskList}>
          <FlatList
            data={Item}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => <ListItem todo={item} />}
          />
        </View>
      </View>

      <View style={styles.bottomWrapper}>
        <View style={styles.inputWrapper}>
          <View style={styles.TimeInputView}>
            <TextInput
              placeholder="Time"
              placeholderTextColor="black"
              style={styles.TextInput}
              onChangeText={(time) => setTime(time)}
            />
          </View>

          <View style={styles.task}>
            <View style={styles.ActionInputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Input task..."
                placeholderTextColor="black"
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

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 0,
  },

  bottomWrapper: {
    height: dimensions.height / 4,
    width: dimensions.width,
    backgroundColor: "#e7f7fc",
    alignContent: "center",
    justifyContent: "center",
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  TimeInputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    width: dimensions.width / 4.5,
    height: dimensions.height / 13,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  ActionInputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    width: dimensions.width / 1.5,
    height: dimensions.height / 13,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  TextInput: {
    fontSize: 15,
  },

  inputButton: {
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#23A6F0",
    borderRadius: 10,
    width: dimensions.width / 5,
    height: dimensions.height / 15,
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 25,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },

  taskWrapper: {
    backgroundColor: "#c0eaf8",
    width: dimensions.width,
    height: dimensions.height - dimensions.height / 2.75,
  },

  titleWrapper: {
    alignItems: "center",
    marginTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginHorizontal: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    justifyContent: "center",
  },

  listItem: {
    padding: 15,
    fontSize: 10,
    backgroundColor: "white",
    flexDirection: "row",
    width: dimensions.width * 0.9,
    height: dimensions.height / 10,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 12,
    borderRadius: 10,
    marginVertical: 15,
  },

  listItemTask: {
    flexDirection: "column",
    width: 200
  },

  taskText: {
    fontSize: 20,
    justifyContent: "flex-start",
    fontWeight: "bold",
  },

  listItemDate: {
    flexDirection: "column",
    width: 80,
    marginTop: 5,
  },

  dateText: {
    fontSize: 15,
    justifyContent: "flex-start",
    fontWeight: "600",
  },

  taskList: {
    marginTop: 15,
    alignItems: "center",
  },

  imageStyle: {
    height: 30,
    width: 30,
  }
});
