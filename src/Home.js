import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>

      <Pressable style = {styles.button}
                 onPress={() => navigation.navigate("Patient SignIn")}>
        <Text style = {styles.buttonText}>Patient Sign-in</Text>
      </Pressable>

      <Pressable style = {styles.button}
                 onPress={() => navigation.navigate("CareGiver SignIn")}>
        <Text style = {styles.buttonText}>Caregiver Sign-in</Text>
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

  button: {
    alignItems: "center",
    backgroundColor: "#67CB5E",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black"
  },
});
