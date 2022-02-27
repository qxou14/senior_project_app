import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Button,
  Alert,
  Pressable,
  Text,
  Image,
} from "react-native";

export default function Add_photo({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>IN add</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 40,
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
