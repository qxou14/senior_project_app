import { StyleSheet, View, Button, Alert, Pressable, Text } from "react-native";
import { auth } from "../firebase";
import Input_button from "./Input_button";

export default function Caregiver_content({ navigation }) {

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home");
        console.log("User signing out");
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>

      <Pressable style = {styles.button} onPress={() => console.log("From Register")}>
        <Text style = {styles.buttonText}>Reports</Text>
      </Pressable>

      <Pressable style = {styles.button} onPress={() => console.log("From Register")}>
        <Text style = {styles.buttonText}>Map</Text>
      </Pressable>

      <Pressable style = {styles.button} onPress={() => console.log("From Register")}>
        <Text style = {styles.buttonText}>Feedback</Text>
      </Pressable>

      <Pressable style = {styles.SignOutbutton} onPress = {handleSignOut}>
        <Text style = {styles.buttonText}>Sign out</Text>
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
    backgroundColor: "#5DB075",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 10,
  },

  SignOutbutton: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    position: "absolute",
    bottom: 35
  },

  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
