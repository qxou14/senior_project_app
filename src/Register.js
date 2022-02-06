import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import Input_button from "./Input_button";

export default function Register() {
  return (
    <View style={styles.container}>
      <Input_button place_holder_name="Enter patient username" />
      <Input_button place_holder_name="Enter patient password" />
      <Input_button place_holder_name="Confirmed patient password" />

      <Input_button place_holder_name="Enter caregiver username" />
      <Input_button place_holder_name="Enter caregiver password" />
      <Input_button place_holder_name="Confirmed caregiver password" />

      <Pressable onPress={() => console.log("From Register")}>
        <Text>Sign up now !</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  button: {},
});
