import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  Image,
  Alert,
} from "react-native";
import Input_button from "./Input_button";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SignIn({ navigation }) {
  //states for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //this is for show password
  const [icon, setIcon] = useState("eye");
  const [hidePass, setHidePass] = useState(true);

  //authentication listener - navigates to next page when a login successfully occurs
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Patient Content");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert("Invalid password or username"));
  };

  const handleHidePassword = () => {
    if (icon === "eye") {
      setIcon("eye-off");
      setHidePass(false);
    } else {
      setIcon("eye");
      setHidePass(true);
    }
  };

  return (
    <View style={styles.container}>

      <View style = {styles.topContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")}></Image>
        <Text style={styles.title}>Patient Sign-In</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="green"
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="green"
          secureTextEntry={hidePass}
          onChangeText={(password) => setPassword(password)}
        />
        <Pressable>
          <MaterialCommunityIcons
            name={icon}
            size={24}
            color="black"
            onPress={handleHidePassword}
          />
        </Pressable>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          title="Register"
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
  topContainer: {
    top: "10%",
    alignItems: "center",
  },
  
  title: {
    color: "#0081A7",
    fontSize: 25,
    fontWeight: "700",
    paddingBottom: 60,
    marginBottom: 50,
  },

  logo: {
    width: 150,
    height: 150,
  },
  
  container: {
    flex: 1,
    backgroundColor: "#CCFFCC",
    alignItems: "center",
  },

  bottomContainer: {
    position: "relative",
    top: "5%",
  },

  inputView: {
    backgroundColor: "#F6F6F6",
    borderRadius: 5,
    width: "75%",
    height: 60,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 15,
  },

  TextInput: {
    fontWeight: "bold",
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 15,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#5DB075",
    paddingVertical: 15,
    paddingHorizontal: 120,
    borderRadius: 30,
    marginBottom: 10,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});