import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
} from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import React, { useState } from "react";

export default function Profile_patient(props) {
  const [Street, setStreet] = useState("");
  const [State_locate, setStateLocate] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState(0);
  const [FullAddress, setAddress] = useState("");

  const update_info = (Street, State_locate, City, Zip) => {
    let full = Street + " , " + City + " , " + State_locate + " , " + Zip;
    db.collection("profile")
      .doc(auth.currentUser.email)
      .set({
        username: auth.currentUser.email,
        City: City,
        Full_Address: full,
        State: State_locate,
        street_name: Street,
        zip_code: Zip,
      })
      .then(() => {
        console.log("address posted  !");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <Text>profile</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Street Name"
          placeholderTextColor="green"
          onChangeText={(name) => setStreet(name)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Zip Code"
          placeholderTextColor="green"
          onChangeText={(zip) => setZip(zip)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="State"
          placeholderTextColor="green"
          onChangeText={(s) => setStateLocate(s)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="City"
          placeholderTextColor="green"
          onChangeText={(city) => setCity(city)}
        />
      </View>

      <Pressable
        style={styles.button}
        title="Register"
        onPress={() => {
          update_info(Street, State_locate, City, Zip);
        }}
      >
        <Text style={styles.buttonText}>Update info</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
    justifyContent: "center",
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
});
