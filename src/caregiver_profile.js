import { StatusBar } from "expo-status-bar";
import { auth, db } from "../firebase";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";

const disensions = Dimensions.get("screen");

export default function Profile_patient(props) {
  const [Street, setStreet] = useState("");
  const [State_locate, setStateLocate] = useState("");
  const [City, setCity] = useState("");
  const [Zip, setZip] = useState(0);
  const [FullAddress, setAddress] = useState("");

  useEffect(() => {
    const ref = db
      .collection("profile")
      .where("username", "==", auth.currentUser.email);
    ref.onSnapshot((query) => {
      const objs = [];

      query.forEach((doc) => {
        if (doc.data().Full_Address !== "") {
          setAddress(doc.data().Full_Address);
        }
      });
    });
  }, []);

  const update_info = (Street, State_locate, City, Zip) => {
    let full = Street + ", " + City + ", " + State_locate + ", " + Zip;
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

    setStreet("");
    setStateLocate("");
    setCity("");
    setZip("");
  };

  const [loaded] = useFonts({
    Sans: require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.topWrapper}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Patient Address Info.</Text>
        <Text style={styles.address}>{FullAddress}</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Street Name"
          placeholderTextColor="green"
          onChangeText={(name) => setStreet(name)}
          value={Street}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Zip Code"
          placeholderTextColor="green"
          onChangeText={(zip) => setZip(zip)}
          value={Zip}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="State"
          placeholderTextColor="green"
          onChangeText={(s) => setStateLocate(s)}
          value={State_locate}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="City"
          placeholderTextColor="green"
          onChangeText={(city) => setCity(city)}
          value={City}
        />
      </View>

      <Pressable
        style={styles.button}
        title=""
        onPress={() => {
          update_info(Street, State_locate, City, Zip);
        }}
      >
        <Text style={styles.buttonText}>Update Info</Text>
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
  topWrapper: {
    width: disensions.width,
    height: disensions.height / 4,
    alignItems: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 30,
    fontFamily: "Sans",
  },

  subtitle: {
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    marginBottom: 30,
    fontFamily: "Sans",
  },

  address: {
    fontSize: 20,
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

  button: {
    alignItems: "center",
    backgroundColor: "green",
    borderRadius: 40,
    width: disensions.width / 2,
    height: disensions.height / 12,
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Sans",
  },
});
