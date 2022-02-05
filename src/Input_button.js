import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, TextInput } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import React from "react";

export default function Input_button(props) {
  return (
    <View style={styles.container}>
      <TextInput placeholder={props.place_holder_name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 250,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
  },
});
