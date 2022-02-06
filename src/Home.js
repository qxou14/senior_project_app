import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Pressable onPressIn={() => navigation.navigate("Patient SignIn")}>
        <Text>Patient</Text>
      </Pressable>
      <Pressable onPressIn={() => navigation.navigate("CareGiver SignIn")}>
        <Text>Caregiver</Text>
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
