import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable, Text, TextInput} from "react-native";
import Input_button from "./Input_button";

export default function SignIn({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="black"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="black"
        />
      </View>

      <Pressable style = {styles.button} 
                 onPress={() => console.log("hello world")}>
        <Text style = {styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style = {styles.button}
                 title="Register"
                 onPress={() => navigation.navigate("Register")}>
        <Text style = {styles.buttonText}>Register</Text>
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

  inputView: {
    backgroundColor: "#B9EBB5",
    borderRadius: 30,
    width: "70%",
    height: 40,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  TextInput: {
    fontWeight: "bold",
    height: 50,
    flex: 1,
    padding: 10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#61C259",
    paddingVertical: 20,
    paddingHorizontal: 65,
    borderRadius: 10,
    marginTop: 25,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black"
  },
});
