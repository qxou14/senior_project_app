import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";
import Input_button from "./Input_button";

export default function Caregiver_content({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Reports</Text>
      </Pressable>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Map</Text>
      </Pressable>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Feedback</Text>
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
