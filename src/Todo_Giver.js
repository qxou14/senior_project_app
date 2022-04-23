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
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const dimensions = Dimensions.get("screen");

export default function Todo_Giver({ navigation }) {
  const [Item, setItem] = useState([]);
  const [time, setTime] = useState('Set Time');
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

      setTime('Select Time');
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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //console.log("A date has been picked: ", date);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let am_pm = '';

    if (hours == 0) {
      hours = 12;
      am_pm = 'AM';
    } 
    else if (hours > 0 && hours < 12) {am_pm = 'AM'}
    else if (hours == 12) {am_pm = 'PM';}
    else {
      hours = hours - 12
      am_pm = 'PM';
    }

    setTime(hours + ':' + minutes + ' ' + am_pm)
    //console.log(hours + ':' + minutes + ' ' + am_pm)
    hideDatePicker();
  };


  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#f5fcfe", "#b1e5f6"]}
        style={styles.background}
        start = {[0.1, 0.2]}
      />

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

      <KeyboardAvoidingView style={styles.bottomWrapper} behavior= "position">
        <View style={styles.inputWrapper}>
          <View style={styles.TimeInputView}>

          <Pressable style={styles.button} onPress={showDatePicker}>
            <Text style={styles.buttonText}> {time} </Text>
          </Pressable>

          <DateTimePickerModal
            isVisible = {isDatePickerVisible}
            mode = "time"
            onConfirm = {handleConfirm}
            onCancel = {hideDatePicker}
          /> 
          </View>

          <View style={styles.task}>
            <View style={styles.ActionInputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter task..."
                placeholderTextColor="black"
                fontWeight = "bold"
                onChangeText={(action) => setAction(action)}
              />
            </View>
          </View>
          
          <Pressable style={styles.addbutton} onPress={add_info}>
            <Text style={styles.addbuttonText}>Add</Text>
          </Pressable>

        </View>
      
      </KeyboardAvoidingView>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "flex-end",
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },

  bottomWrapper: {
    height: dimensions.height / 4,
    width: dimensions.width / 1.1,
    flex: 1,
    //backgroundColor: "#e7f7fc",
    //alignContent: "center",
    //justifyContent: "flex-end",
    //position: "relative",
  },

  inputWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  TimeInputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: dimensions.width / 4.5,
    height: dimensions.height / 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 8,
  },

  ActionInputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: dimensions.width / 2,
    height: dimensions.height / 12,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 8,
  },

  TextInput: {
    fontSize: 15,
  },

  inputButton: {
    alignItems: "center",
  },

  button: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    width: dimensions.width / 5,
    height: dimensions.height / 15,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#454946",
  },

  addbutton: {
    alignItems: "center",
    backgroundColor: "#63d37c",
    borderRadius: 10,
    width: dimensions.width / 6,
    height: dimensions.height / 12,
    justifyContent: "center",
    marginTop: 0,
    marginBottom: 25,
    elevation: 5,
    flexDirection: "row",
  },

  addbuttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#454946",
  },

  taskWrapper: {
    //backgroundColor: "#c0eaf8",
    width: dimensions.width,
    height: dimensions.height - dimensions.height / 2.8,
  },

  titleWrapper: {
    alignItems: "center",
    marginTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginHorizontal: 30,
  },

  title: {
    fontSize: 25,
    fontWeight: "500",
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
    elevation: 5,
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
    height: "70%",
  },

  imageStyle: {
    height: 25,
    width: 25,
  }
});
