import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";
import Input_button from "./Input_button";

export default function Patient_content({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Excercises</Text>
      </Pressable>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Reminder</Text>
      </Pressable>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Map</Text>
      </Pressable>
      <Pressable onPress={() => console.log("From Register")}>
        <Text>Calendar</Text>
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
