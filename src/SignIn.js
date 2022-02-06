import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Input_button from "./Input_button";

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>
      <Input_button place_holder_name="username" />
      <Input_button place_holder_name="password" />
      <Button title="Log In" onPress={() => console.log("hello world")} />
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
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
